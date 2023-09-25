import Settings from '../constants/settings';
var apiUrls = {};
const guestMembership = 1;
const premiumMembership = 2;
const siteId = 2;
var apiEndPoint = '';
const appUrl = Settings.APP_URL || {};
let noApiMode = 'NO';
if (noApiMode === 'NO') {
    apiEndPoint = Settings.API_END_POINT_URL || {};
    apiUrls = {
        NO_API_MODE: `${noApiMode}`,
        SITE_ID: `${siteId}`,
        BASE_PATH: `${apiEndPoint}`,
        GUEST_MEM_ID: `${guestMembership}`,
        PREMIUM_MEM_ID: `${premiumMembership}`,
        SITE_ID: `${siteId}`,
        APP_BASE_PATH: `${appUrl}`,
        HOMEPAGE_DATA: `${apiEndPoint}/api/v1/homepageData/${siteId}`,
        BANNER_LIST: `${apiEndPoint}/api/v1/bannerList/${siteId}`,
        MEMBERSHIP_LIST: `${apiEndPoint}/api/v1/membershipList/${siteId}`,
        LOGIN_SUBMIT: `${apiEndPoint}/api/v1/loginSubmit/${siteId}`,
        STATE_LIST: `${apiEndPoint}/api/v1/stateList/${siteId}`,
        SKILL_LIST: `${apiEndPoint}/api/v1/skillList/${siteId}`,
        LANGUAGE_LIST: `${apiEndPoint}/api/v1/languageList/${siteId}`,
        SPECIALIZATION_LIST: `${apiEndPoint}/api/v1/specializationList/${siteId}`,
        SOFTWARE_SUBSCRIPTION_LIST: `${apiEndPoint}/api/v1/softwareSubscriptionList/${siteId}`,
        REGISTER_SUBMIT: `${apiEndPoint}/api/v1/registerSubmit/${siteId}`,
        PROFILE_DATA: `${apiEndPoint}/api/v1/profileData/${siteId}`,
        PROFILE_UPDATE: `${apiEndPoint}/api/v1/profileUpdate/${siteId}`,
        JOB_POST_SUBMIT: `${apiEndPoint}/api/v1/jobPostSubmit/${siteId}`,
        JOB_LIST_DATA: `${apiEndPoint}/api/v1/jobListData/${siteId}`,
        JOB_DATA_DELETE: `${apiEndPoint}/api/v1/jobDataDelete`,
        JOB_SEARCH: `${apiEndPoint}/api/v1/jobSearch`,
        PROFILE_SEARCH: `${apiEndPoint}/api/v1/profileSearch`,
        MY_REFERRAL_DATA: `${apiEndPoint}/api/v1/referralData`,
        COMPANY_PROFILE_UPDATE: `${apiEndPoint}/api/v1/companyProfileUpdate`,
        EDUCATION_PROFILE_UPDATE: `${apiEndPoint}/api/v1/educationProfileUpdate`,
        PERSONAL_PROFILE_UPDATE: `${apiEndPoint}/api/v1/personalProfileUpdate`,
        PROFESSIONAL_PROFILE_UPDATE: `${apiEndPoint}/api/v1/professionalProfileUpdate`,
        SOCIALHANDLE_PROFILE_UPDATE: `${apiEndPoint}/api/v1/socialHandleProfileUpdate`,
        MSG_SUBMIT: `${apiEndPoint}/api/v1/msgSubmit`,
        MSG_DATA: `${apiEndPoint}/api/v1/msgData`,
        EMAIL_SHARE: `${apiEndPoint}/api/v1/shareEmail`,
    
        NAV_MENU: `${apiEndPoint}/api/v1/navigationMenu/${siteId}`,
        PAGE_DATA: `${apiEndPoint}/api/v1/pageData`,
        CONTACT_SUBMIT: `${apiEndPoint}/api/v1/contactSubmit`,
        ADDRESS_DATA: `${apiEndPoint}/api/v1/addressData`,
        BLOG_DATA: `${apiEndPoint}/api/v1/blogData`,
        TESTIMONIAL_DATA: `${apiEndPoint}/api/v1/testimonialData`,
        SETTINGS_DATA: `${apiEndPoint}/api/v1/settingsData`,
        NEWSLETTER_SUBMIT: `${apiEndPoint}/api/v1/newsletterSubmit`,
        META_DATA: `${apiEndPoint}/api/v1/metaData`,
        IMAGES_DATA: `${apiEndPoint}/api/v1/imageData`
    };
} else {
    apiEndPoint = Settings.APP_URL || {};
    apiUrls = {
        NO_API_MODE: `${noApiMode}`,
        SITE_ID: `${siteId}`,
        BASE_PATH: `${apiEndPoint}`,
        GUEST_MEM_ID: `${guestMembership}`,
        PREMIUM_MEM_ID: `${premiumMembership}`,
        SITE_ID: `${siteId}`,
        APP_BASE_PATH: `${appUrl}`,
        HOMEPAGE_DATA: `${apiEndPoint}/api/v1/homepageData.json`,
        BANNER_LIST: `${apiEndPoint}/api/v1/bannerList.json`,
        MEMBERSHIP_LIST: `${apiEndPoint}/api/v1/membershipList.json`,
        LOGIN_SUBMIT: `${apiEndPoint}/api/v1/loginSubmit.json`,
        STATE_LIST: `${apiEndPoint}/api/v1/stateList.json`,
        SKILL_LIST: `${apiEndPoint}/api/v1/skillList.json`,
        LANGUAGE_LIST: `${apiEndPoint}/api/v1/languageList.json`,
        SPECIALIZATION_LIST: `${apiEndPoint}/api/v1/specializationList.json`,
        SOFTWARE_SUBSCRIPTION_LIST: `${apiEndPoint}/api/v1/softwareSubscriptionList.json`,
        REGISTER_SUBMIT: `${apiEndPoint}/api/v1/registerSubmit.json`,
        PROFILE_DATA: `${apiEndPoint}/api/v1/profileData.json`,
        PROFILE_UPDATE: `${apiEndPoint}/api/v1/profileUpdate.json`,
        JOB_POST_SUBMIT: `${apiEndPoint}/api/v1/jobPostSubmit.json`,
        JOB_LIST_DATA: `${apiEndPoint}/api/v1/jobListData.json`,
        JOB_DATA_DELETE: `${apiEndPoint}/api/v1/jobDataDelete`,
        JOB_SEARCH: `${apiEndPoint}/api/v1/jobSearch.json`,
        PROFILE_SEARCH: `${apiEndPoint}/api/v1/profileSearch.json`,
        MY_REFERRAL_DATA: `${apiEndPoint}/api/v1/referralData.json`,
        COMPANY_PROFILE_UPDATE: `${apiEndPoint}/api/v1/companyProfileUpdate.json`,
        EDUCATION_PROFILE_UPDATE: `${apiEndPoint}/api/v1/educationProfileUpdate.json`,
        PERSONAL_PROFILE_UPDATE: `${apiEndPoint}/api/v1/personalProfileUpdate.json`,
        PROFESSIONAL_PROFILE_UPDATE: `${apiEndPoint}/api/v1/professionalProfileUpdate.json`,
        SOCIALHANDLE_PROFILE_UPDATE: `${apiEndPoint}/api/v1/socialHandleProfileUpdate.json`,
    
        NAV_MENU: `${apiEndPoint}/api/v1/navigationMenu.json`,
        PAGE_DATA: `${apiEndPoint}/api/v1/pageData`,
        CONTACT_SUBMIT: `${apiEndPoint}/api/v1/contactSubmit`,
        ADDRESS_DATA: `${apiEndPoint}/api/v1/addressData`,
        BLOG_DATA: `${apiEndPoint}/api/v1/blogData`,
        TESTIMONIAL_DATA: `${apiEndPoint}/api/v1/testimonialData`,
        SETTINGS_DATA: `${apiEndPoint}/api/v1/settingsData`,
        NEWSLETTER_SUBMIT: `${apiEndPoint}/api/v1/newsletterSubmit`,
        META_DATA: `${apiEndPoint}/api/v1/metaData`,
        IMAGES_DATA: `${apiEndPoint}/api/v1/imageData`
    };
}
export default apiUrls;
