import { PatientsProvider } from 'contexts';
import { AppProps } from 'next/app';

import './global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <PatientsProvider>
            <main>
                <Component {...pageProps} />
            </main>
        </PatientsProvider>
    );
}