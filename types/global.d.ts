/*
 https://huns.me/2022-05-22-43-TypeScript%EC%97%90%EC%84%9C%20%EC%A0%84%EC%97%AD%20%EA%B0%9C%EC%B2%B4%20%ED%83%80%EC%9E%85%EC%9D%80%20%EC%96%B4%EB%96%BB%EA%B2%8C%20%EC%A0%95%EC%9D%98%ED%95%98%EB%82%98%EC%9A%94
 타입스크립트로 작성하지 않은 코드의 타입은 Ambient Declaration 이라는 걸로 정의할 수 있다.
 이때 declare 키워드를 사용할 수 있다.
 크게 세 종류의 모듈 타입을 declare 키워드로 정의할 수 있다.
 declare namespace, declare module, declare global
 타입스크립트 컴파일러는 declare 키워드를 사용한 모듈 선언을 js파일로 컴파일하지 않는다.
 하지만 export 키워드가 포함된 타입스크립트 파일은 자바스크립트로 컴파일한다(d.ts 제외)
 globalThis를 타이핑 할때는 무엇이라도 좋으니 export 키워드를 사용한 선언을 추가하자
*/

export interface IKaKaoAccount {
  name_needs_agreement?: boolean
  name?: string
  has_phone_number?: boolean
  phone_number_needs_agreement?: boolean
  phone_number?: string
  has_birthyear?: boolean
  birthyear_needs_agreement?: boolean
  birthyear?: string
  has_birthday?: boolean
  birthday_needs_agreement?: boolean
  birthday?: string
  birthday_type?: string
}

interface IKaKaoProfile {
  id: number
  connected_at: string
  synched_at: string
  kakao_account: IKaKaoAccount
}

interface IKakaoAccessFail {
  error: string
  error_code: string
  error_description: string
}

interface IKakaoAccessSucceed {
  access_token: string
  expires_in: number
  refresh_token: string
  refresh_token_expires_in: number
  scope: string
  token_type: string
}

interface IKakaoAPIError {
  msg: string
  code: null
}

interface IRequestPayload<ResponseType> {
  url?: string

  container?: string

  success(response: ResponseType): void

  fail(err: IKakaoAPIError): void
}

type KakaoAPIType = <ResponseType>(
  payload: IRequestPayload<ResponseType>,
) => void

// 리버스 엔지니어링으로 정의한 카카오 SDK의 타입
interface IKaKaoSDK {
  API: {
    cleanup(): void
    request: KakaoAPIType
  }
  Auth: {
    authorize: KakaoAPIType
    autoLogin: KakaoAPIType
    cleanup(): void
    createLoginButton: KakaoAPIType
    createShippingAddress: KakaoAPIType
    getAccessToken(): string | undefined
    getAppKey(): string
    getRefreshToken(): string | undefined
    getStatusInfo: KakaoAPIType
    issueAccessToken: KakaoAPIType
    login: KakaoAPIType
    loginForm: KakaoAPIType
    logout(): void
    selectShippingAddress: KakaoAPIType
    setAccessToken(value: string | undefined): void
    setRefreshToken(value: string | undefined): void
    updateShippingAddress: KakaoAPIType
  }
  Channel: {
    addChannel: KakaoAPIType
    chat: KakaoAPIType
    cleanup(): void
    createAddChannelButton: KakaoAPIType
    createChatButton: KakaoAPIType
  }
  Link: {
    cleanup(): void
    createCustomButton: KakaoAPIType
    createDefaultButton: KakaoAPIType
    createScrapButton: KakaoAPIType
    deleteImage: KakaoAPIType
    scrapImage: KakaoAPIType
    sendCustom: KakaoAPIType
    sendDefault: KakaoAPIType
    sendScrap: KakaoAPIType
    uploadImage: KakaoAPIType
  }
  Navi: {
    cleanup(): void
    share: KakaoAPIType
    start: KakaoAPIType
  }
  Picker: {
    cleanup(): void
    select: KakaoAPIType
    selectChat: KakaoAPIType
    selectFriend: KakaoAPIType
    selectFriends: KakaoAPIType
  }
  PlusFriend: {
    addFriend: KakaoAPIType
    chat: KakaoAPIType
    cleanup(): void
    createAddFriendButton: KakaoAPIType
    createChatButton: KakaoAPIType
  }
  Story: {
    cleanup(): void
    createFollowButton: KakaoAPIType
    createShareButton: KakaoAPIType
    open: KakaoAPIType
    share: KakaoAPIType
  }
  VERSION: string
  cleanup(): void
  init(key: string): void
  isInitialized(): boolean
}

// declare global 안에 선언한 타입은 전역 객체의 프로퍼티 타입으로 정의된다.
declare global {
  var Kakao: IKaKaoSDK
}
