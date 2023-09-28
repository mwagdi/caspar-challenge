import { FilterProvider } from 'contexts';
import { AppProps } from 'next/app';

import './global.scss';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <FilterProvider>
            <main>
                <Component {...pageProps} />
            </main>
        </FilterProvider>
    );
}