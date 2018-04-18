
export const SessionEvents = {
    sessionExpired: "auth:session-expired",
    sessionStarted: "auth:session-started",
    sessionStopped: "auth:session-stopped"
};

let checkSessionInterval = null;

export class SessionService {

    constructor(OrphaUtilService, StorageService, LogService) {

        this.util = OrphaUtilService;
        this.storage = StorageService;
        this.log = LogService;

        this.sessionTtl = 1000 * 60 * 10; // 10min
        checkSessionInterval = null;
        this.checkSessionTimeInterval = 1000; //1s
    }

    _getLastActivity() {
        return this.storage.hasKey('lastActivity') ? new Date(this.storage.get('lastActivity')) : null;
    }

    _setLastActivity(lastActivity) {
        return this.storage.set('lastActivity', lastActivity);
    }

    setSessionTTL(sessionTtl) {
        this.sessionTtl = sessionTtl;
    }

    start() {
        if (this.exists()) this.stop();
        this.touch();
        checkSessionInterval = this.util.interval(() => this.checkSessionFn(), this.checkSessionTimeInterval);
        this.util.broadcast(SessionEvents.sessionStarted);
        this.log.info('Session started.');
    }

    stop() {
        this.util.cancelInterval(checkSessionInterval);
        checkSessionInterval = null;
        this.storage.remove("lastActivity");
        this.log.info('Session stopped.');
        this.util.broadcast(SessionEvents.sessionStopped);
    }

    touch() {
        this._setLastActivity(new Date());
    }

    isExpired() {
        const lastActivity = this._getLastActivity();
        if (lastActivity !== null)
            return ((new Date()).getTime() - lastActivity.getTime()) >= this.sessionTtl;
        return true;
    }

    exists() {
        return checkSessionInterval !== null && this._getLastActivity() !== null;
    }

    checkSessionFn() {
        if (this.isExpired() && this.exists()) {
            this.stop();
            this.util.timeout(() => { this.util.broadcast(SessionEvents.sessionExpired) }, 10);
            this.log.info('Session expired.');
        }
    }
}

SessionService.$inject = ['OrphaUtilService', 'StorageService', 'LogService'];