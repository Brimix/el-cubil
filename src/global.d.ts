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
        }

        function initialize(options: {
          client_id: string;
          callback: (response: CredentialResponse) => void;
        }): void;

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
          }
        ): void;

        function disableAutoSelect(): void;
      }
    }
  }
}
