export {};

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace accounts {
      namespace id {
        interface CredentialResponse {
          credential: string;
          select_by: string;
          clientId: string;
        }

        function initialize(options: {
          client_id: string;
          auto_select?: boolean;
          callback: (response: CredentialResponse) => void;
          login_uri?: string;
          native_callback?: Function;
          cancel_on_tap_outside?: boolean;
          prompt_parent_id?: string;
          nonce?: string;
          context?: string;
          state_cookie_domain?: string;
          ux_mode?: 'popup' | 'redirect';
          allowed_parent_origin?: string | string[];
          itp_support?: boolean;
        }): void;

        function prompt(momentListener?: (promptMomentNotification: PromptMomentNotification) => void): void;

        function renderButton(
          parent: HTMLElement,
          options: {
            type?: string;
            theme?: string;
            size?: string;
            text?: string;
            shape?: string;
            logo_alignment?: string;
            width?: string;
            locale?: string;
          }
        ): void;

        function disableAutoSelect(): void;

        function storeCredential(credential: { id: string; password: string }, callback?: Function): void;

        function cancel(): void;

        interface PromptMomentNotification {
          isDisplayMoment(): boolean;
          isDisplayed(): boolean;
          isNotDisplayed(): boolean;
          getNotDisplayedReason(): string;
          isSkippedMoment(): boolean;
          getSkippedReason(): string;
          isDismissedMoment(): boolean;
          getDismissedReason(): string;
          getMomentType(): string;
        }
      }

      namespace oauth2 {
        interface TokenClientConfig {
          client_id: string;
          scope: string;
          hint?: string;
          hosted_domain?: string;
          callback?: (tokenResponse: TokenResponse) => void;
          error_callback?: (error: { type: string; message: string }) => void;
          prompt?: '' | 'none' | 'consent' | 'select_account';
        }

        interface TokenResponse {
          access_token: string;
          expires_in: string;
          token_type: string;
          scope: string;
          error?: string;
          error_description?: string;
          error_uri?: string;
        }

        interface TokenClient {
          requestAccessToken(additionalOptions?: {
            hint?: string;
            prompt?: '' | 'none' | 'consent' | 'select_account';
          }): void;
          callback?: (response: TokenResponse) => void;
          error_callback?: (error: { type: string; message: string }) => void;
        }

        function initTokenClient(config: TokenClientConfig): TokenClient;
      }
    }
  }
}
