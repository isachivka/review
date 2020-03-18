const modulesLocale = {
  events: '[@review/events]',
  gitHubFetch: '[@review/github-fetch]',
  core: '[@review/core]',
  ui: '[@review/ui]',
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type consoleLog = (mess: any, ...opt: any[]) => void

interface Logger {
  log: consoleLog;
  warn: consoleLog;
  error: consoleLog;
}

class ReviewConsole implements Logger {
  _module: string;

  constructor(module: string) {
    this._module = module;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(...args: any): void {
    console.log(this._module, ...args);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  warn(...args: any): void {
    console.warn(this._module, ...args)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error(...args: any): void {
    console.error(this._module, ...args)
  }
}

class Log {
  events: Logger;
  githubFetch: Logger;
  core: Logger;
  ui: Logger;

  constructor() {
    this.events = new ReviewConsole(modulesLocale.events);
    this.ui = new ReviewConsole(modulesLocale.ui);
    this.githubFetch = new ReviewConsole(modulesLocale.gitHubFetch);
    this.core = new ReviewConsole(modulesLocale.core);
  }
}

export default new Log();
