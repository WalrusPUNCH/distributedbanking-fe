const actionTypes = {
    HOST: 'http://localhost:5221/',
    IDENTITY: {
        REGISTER_CUSTOMER: 'api/identity/register/customer',
        REGISTER_WORKER: 'api/identity/register/worker',
        REGISTER_ADMIN: 'api/identity/register/admin',
        LOGIN: 'api/identity/login',
        LOGOUT: 'api/identity/logout',
        DELETE_IDENTITY: 'api/identity',
        UPDATE_PASSPORT: 'api/identity/customer/update_passport',
    },
    ACCOUNT: {
        ACTIVELINE: 'api/events/',
        TOP: 'api/events/top?',
        ADJUSTSCORE: 'api/events/adjustScore?eventId=',
        CSVREPORT: 'api/events/top-match-{brand}.csv',
        AUTOPUBLISH: 'api/configuration/public',
        PUBLISHCONFIGURATION: 'api/configuration/TopMatchExporterOptions',
        CHECKPUBLISHCONFIGURATIONUPDATE: 'api/settings/fetch?updateTimestamp=',
    },
    CONFIGURATION: {
        GET_PUBLIC: 'api/configuration/public/',
        SUBMIT: 'api/configuration/',
        GET: 'api/configuration/{configuration_name}',
        GET_BRANDED: 'api/configuration/{configuration_name}/{brand}',
        GET_CHANNELED: 'api/configuration/{configuration_name}/{brand}/{channel}',
        FETCH: 'api/configuration/{configuration_name}/fetch/',
        PUBLISH_SETTINGS: 'TopMatchExporterOptions',
        BRAND_SETTINGS: 'BrandOptions',
        CHANNEL_OPTIONS: 'options/channels',
        QAB_OPTIONS: 'db/QabConfigOptions',
        MIX_CONTENT_OPTIONS: 'db/MixContentOptions',
        ADJUSTMENTS_RULES_OPTIONS: 'ScoreAdjustmentRuleOptions',
        SPORTIDS_OPTIONS: 'options/ShortSportNames',
        SPORT_NAMES_OPTIONS: 'options/SportNames',
    },
    SNAPSHOTS: {
        GETLIST: 'api/snapshots/{configuration}/list',
        GETBYID: 'api/snapshots/id/{guid}',
    },
    CONFIGURATION_ITEMS: {
        PUBLISH_SETTINGS: 'TopMatchExporterOptions',
        BRAND_OPTIONS: 'BrandOptions',
    },
};

export default actionTypes;
