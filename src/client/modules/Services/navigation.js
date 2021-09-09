const PAGES = {
    apply: {title: 'Apply', id: 'apply', stage: 'Intake', page: 'Application Intake', order: 1, visible: false},
    primer: {
        title: 'Are you Ready?',
        id: 'primer',
        stage: 'Intake',
        page: 'Application Primer',
        order: 2,
        visible: false
    },
    programSelection: {
        title: 'Program Selection',
        id: 'programSelection',
        stage: 'Program Selection',
        page: 'Program Selection',
        order: 3,
        visible: false
    },
    applicantInfo: {
        title: 'Applicant Information',
        id: 'applicantInfo',
        stage: 'Applicants',
        page: 'Applicant Info',
        order: 4,
        visible: false
    },
    contactInfo: {
        title: 'ContactInfo Information',
        id: 'contactInfo',
        stage: 'Applicants',
        page: 'Primary Contact Info',
        order: 5,
        visible: false
    },
    applicantList: {
        title: 'Applicant List',
        id: 'applicantList',
        stage: 'Applicants',
        page: 'Applicant List',
        order: 6,
        visible: false
    },
    addApplicant: {
        title: 'Add Applicant',
        id: 'addApplicant',
        stage: 'Applicants',
        page: 'Add Applicant',
        order: 7,
        visible: false
    },
    success: {title: 'Success', id: 'success', stage: 'Applicants', page: 'Success', order: 8, visible: false},
    forms: {title: 'Forms', id: 'forms', stage: 'Health History', page: 'Forms', order: 9, visible: false}
};

const PAGE_LIST = [
    PAGES.apply,
    PAGES.primer,
    PAGES.programSelection,
    PAGES.applicantInfo,
    PAGES.contactInfo,
    PAGES.applicantList,
    PAGES.addApplicant,
    PAGES.success,
    PAGES.forms
];

const DEFAULT_PAGE = PAGES.apply;

const setApplicationStagePage = (object, currentPage) => {
    let applicantPage = PAGE_LIST.find((page) => page.page === object.ApplicationPage);
    let nextPage = PAGE_LIST.find((page) => page.order === currentPage.order + 1)
    if (!applicantPage || applicantPage.order < nextPage.order) {
        object.ApplicationStage = nextPage.stage;
        object.ApplicationPage = nextPage.page;
    }
}

const getPageParamFromUrl = (returnUrlPage) => {
    let urlPage = new URL(window.location.href).searchParams.get('page');
    if (
        urlPage &&
        PAGES[urlPage] && returnUrlPage
    ) {
        return PAGES[urlPage];
    }
    return DEFAULT_PAGE;
}

export { PAGES, setApplicationStagePage }

export default class Navigation {

    pages;
    currentPage;
    pageList;

    constructor(loadPageFromURL) {
        this.pages = PAGES;
        this.pageList = PAGE_LIST.sort((a, b) => { return (a.order > b.order) ? 1 : -1 });
        let setPage = getPageParamFromUrl(loadPageFromURL);
        this.setCurrentPage(setPage);
        let pageURLParam = '?page=' + this.currentPage.id;
        // eslint-disable-next-line no-restricted-globals
        history.replaceState(this.currentPage, this.currentPage.title, pageURLParam);

        window.addEventListener('popstate', this.handleNavigationPopstate.bind(this));
    }

    handleNavigationPopstate(event){

        let page = event.state;
        if (page == null) {
            this.currentPage = DEFAULT_PAGE;
        } else {
           this.setCurrentPage(page);
        }
    }

    setCurrentPage(currentPage){
        if(!currentPage){
            this.currentPage = DEFAULT_PAGE;
        }
        this.currentPage = currentPage;
        this.pageList.forEach((page) => { page.visible = page === this.currentPage });
        document.title = 'CCM Application - ' + this.currentPage.title;

        window.dispatchEvent( new CustomEvent('navigationevent', { detail:
                { currentPage: currentPage, pages: this.pages }
        }));
    }

    get previousPage(){
        if(this.pageList[0].order !== this.currentPage.order){
            return  this.pageList.find((page) => page.order === (this.currentPage.order - 1));
        }
        return this.pageList[0];
    }

    get nextPage(){
        if(this.pageList.indexOf(this.currentPage) !== this.pageList.length - 1) {
            return this.pageList.find((page) => page.order === (this.currentPage.order + 1));
        }
        return this.pageList[this.pageList.length - 1];
    }

    get lastPage(){
        return this.pageList[this.pageList.length - 1];
    }

    get firstPage(){
        return this.pageList[0];
    }

    moveNext(){
        if(this.currentPage.order < this.lastPage.order) {
            this.setCurrentPage(this.nextPage);
            let pageURLParam = '?page=' + this.currentPage.id;
            // eslint-disable-next-line no-restricted-globals
            history.pushState(this.currentPage, this.currentPage.title, pageURLParam);
        }
    }

    moveBack(){
        if(this.currentPage.order > this.previousPage.order) {
            this.setCurrentPage(this.previousPage);
            // eslint-disable-next-line no-restricted-globals
            history.back();
        }
    }

    moveForward(){
        // eslint-disable-next-line no-restricted-globals
        history.forward();
    }



}