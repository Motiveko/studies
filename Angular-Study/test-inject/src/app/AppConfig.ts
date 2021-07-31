import { InjectionToken } from '@angular/core';

export class AppConfig {
    url: string;
    port: string;
    constructor(url: string, port: string, others?: string) {
        console.log('AppConfig 생성 port:' + port)
        this.url = url;
        this.port = port
    }

}

export const MY_APP_CONFIG: AppConfig = new AppConfig('hello','hello') 
// export const YOUR_APP_CONFIG: AppConfig = new AppConfig('YOUR_APP_COINFG','5050') 


// export const APP_CONFIG = new InjectionToken<AppConfig>('')
// 이런식으로 InjectionToken 인스턴스 생성하면서 providedIn: root 해주고 factory값에 인스턴스 생성 메소드를 넣어주면 APP_CONFIG라는 key로 전역에서 의존성 주입이 가능하다
export const APP_CONFIG = new InjectionToken<AppConfig>('', { providedIn: "root", factory: () =>  new AppConfig('니앱이다임마','1234') })

export const AppConfigProvider = {
    provide: "hello",
    useValue: MY_APP_CONFIG
}