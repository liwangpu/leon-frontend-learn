import queryString from 'query-string';
import { createSearchParams } from 'react-router-dom';
import * as _ from 'lodash';
export interface IPage {
  model: 'single' | 'multiple',
  pageId: string;
  routeType: any;
  id?: string;
}

export interface IDynamicPageUrlConfig {
  page: IPage;
  previousUrl?: string;
}

export class DynamicPageUrl {

  public url: string;
  public query: { [key: string]: any } = {};
  public static BACK_PAGES_PARAM_KEY = 'backPages';
  public pages: Array<IPage> = [];
  private config: IDynamicPageUrlConfig;
  public constructor(config: IDynamicPageUrlConfig) {
    const { previousUrl } = config;
    // 之所以要解析之前的url,主要是为了取出上一个页面的pageId,生成返回url参数
    if (previousUrl) {
      this.pages = DynamicPageUrl.parseBackPages(previousUrl);
      // // 把previous上的pageId和routePageType解出来,这里只能自己手动解析了
      let page: IPage = DynamicPageUrl.parsePageParm(previousUrl);
      this.pages.push(page);
    }
    this.config = _.cloneDeep(config);
  }

  /**
   * 设置查询参数项
   * @param property 参数名称
   * @param value 参数值
   * @returns 
   */
  public setQueryParm(property: string, value: any) {
    if (!property) { return; }
    this.query[property] = value;
  }

  /**
   * 设置业务数据Id
   * @param id 
   */
  public setDataId(id: string) {
    this.config.page.id = id;
  }

  public setRouteType(routeType: any) {
    this.config.page.routeType = routeType;
  }

  /**
   * 当前业务场景,有些时候其实返回都不是直接打开的页面,都是列表页面,所以添加这个方法
   */
  public resetBackPageToTop() {
    this.pages = this.pages.slice(0, 1);
  }

  /**
   * 生成url字符串链接
   * @returns 
   */
  public toString() {
    return queryString.stringifyUrl(this.generate());
  }

  /**
   * 生成useNavigate跳转参数
   * @returns 
   */
  public toNavigateParm() {
    const { url, query } = this.generate();

    return {
      pathname: url,
      search: `${createSearchParams(query)}`,
    };
  }

  /**
   * 从url中解析出返回页面的(也就是生成返回页面的url)
   * @param url 
   * @returns 
   */
  public static parseBackUrl(url: string) {
    let pages = DynamicPageUrl.parseBackPages(url);
    console.log(`pages:`, pages);
    let finalUrl: string;
    const finalQuery = {};
    const previousPage = pages[pages.length - 1];
    const previousParentPage = pages.length > 1 ? pages[pages.length - 2] : pages[pages.length - 1];
    if (previousPage.model === 'single') {
      finalUrl = `/tgpd/page-runtime/${previousParentPage.pageId}/${previousPage.routeType}/${previousPage.pageId}`;
      if (previousPage.id) {
        finalUrl += `/${previousPage.id}`;
      }
    } else {
      finalUrl = `/tgpd/page-runtime/${previousParentPage.pageId}/multi-page/${previousPage.routeType}/${previousPage.pageId}`;
      finalQuery['ids'] = previousPage.id;
    }

    pages = pages.length > 1 ? pages.slice(0, pages.length - 2) : [];

    // 把backPages加到query对象上
    if (pages.length) {
      finalQuery[DynamicPageUrl.BACK_PAGES_PARAM_KEY] = DynamicPageUrl.generateBackPageQueryParam(pages);
    }

    return queryString.stringifyUrl({ url: finalUrl, query: finalQuery });
  }

  /**
   * 把当前url部分的页面参数解析出来,因为有可能出于要放到backPage参数或者其他用途
   * 注意,这里解析的不包含query参数部分,是路由中的/tgpd/page-runtime/:parentPageId/list/:pageId参数
   * @param url 
   * @returns 
   */
  public static parsePageParm(url: string) {
    const { query = {}, url: currentUrl } = queryString.parseUrl(url);
    const ups = currentUrl.split('/');
    const pageRuntimeIndex = ups.findIndex(p => p === 'page-runtime');
    const pageMode = currentUrl.includes(`/multi-page/`) ? 'multiple' : 'single';
    let page: IPage;

    if (pageMode === 'single') {
      page = {
        model: 'single',
        pageId: ups[pageRuntimeIndex + 3],
        routeType: ups[pageRuntimeIndex + 2],
      };
      // 如果有id部分
      if (ups.length > pageRuntimeIndex + 3) {
        page.id = ups[pageRuntimeIndex + 4];
      }

    } else {
      page = {
        model: 'multiple',
        pageId: ups[pageRuntimeIndex + 4],
        routeType: ups[pageRuntimeIndex + 3],
        id: query.ids as string,
      };
    }
    return page;
  }

  public static from(url: string): DynamicPageUrl {
    const page = this.parsePageParm(url);
    const pages = this.parseBackPages(url);
    console.log(`pagessss:`, pages);
    const instance = new DynamicPageUrl({ page });
    instance.pages = pages;
    return instance;
  }

  private generate() {
    const { page: desiredPage } = this.config;
    let parentPageId: string;
    if (this.pages.length) {
      const lastItem = this.pages[this.pages.length - 1];
      parentPageId = lastItem.pageId;
    } else {
      parentPageId = desiredPage.pageId;
    }

    // 把dest的页面加上
    switch (desiredPage.model) {
      case 'multiple':
        this.url = `/tgpd/page-runtime/${parentPageId}/multi-page/${desiredPage.routeType}/${desiredPage.pageId}`;
        if (desiredPage.id) {
          this.query.ids = desiredPage.id;
        }
        break;
      default:
        this.url = `/tgpd/page-runtime/${parentPageId}/${desiredPage.routeType}/${desiredPage.pageId}`;
        if (desiredPage.id) {
          this.url += `/${desiredPage.id}`;
        }
        break;
    }

    // 把backPages加到query对象上
    if (this.pages.length) {
      this.query[DynamicPageUrl.BACK_PAGES_PARAM_KEY] = DynamicPageUrl.generateBackPageQueryParam(this.pages);
    }

    return { url: this.url, query: this.query };
  }

  /**
   * 解析查询参数中的返回页面参数
   * @param url Url
   * @returns 
   */
  private static parseBackPages(url: string): Array<IPage> {
    const { query = {} } = queryString.parseUrl(url);
    const pageParamStr: string = query[DynamicPageUrl.BACK_PAGES_PARAM_KEY] as any;
    let pages: Array<IPage> = pageParamStr ? JSON.parse(pageParamStr) : [];
    return pages;
  }

  private static generateBackPageQueryParam(pages: Array<IPage>): string {
    if (!pages?.length) { return; }
    return JSON.stringify(pages);
  }

}

// const previousUrl = `/tgpd/page-runtime/prentId-x1/list/currentId-a1`;
// const previousUrl = `/tgpd/page-runtime/prentId-x1/detail/currentId-a1/dataId-c1`;
const previousUrl = `/tgpd/page-runtime/prentId-x1/multi-page/edit/currentId-a1?ids=1,2,3,4,5`;
// const previousUrl = `/tgpd/page-runtime/currentId-a1?backPages=%5B%7B%22pageMode%22%3A%22multiple%22%2C%22pageId%22%3A%22currentId-a1%3Fids%3D1%2C2%2C3%2C4%2C5%22%2C%22routePageType%22%3A%22edit%22%2C%22dataIds%22%3A%221%2C2%2C3%2C4%2C5%22%7D%5D&ids=1%2C2%2C3%2C4%2C5%2Fedit%2F83934938488888%2F666`;

const instance = new DynamicPageUrl({ page: { model: 'single', pageId: '83934938488888', id: '666', routeType: 'edit' }, previousUrl });
// instance.backToTopPage();

const url = instance.toString();
console.log(`url:                         `, url);



console.log(`--------------------------------------------------`,);
console.log(`--------------------------------------------------`,);

const ins = DynamicPageUrl.from(url);


console.log(`url2:                     `, ins.toString());
