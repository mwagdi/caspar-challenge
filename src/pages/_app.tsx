import { AppProps } from 'next/app';

import './global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <main>
            <Component {...pageProps} />
        </main>
    );
}