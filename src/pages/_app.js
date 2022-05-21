import '../styles/styles.scss';
import MainLayout from '../layout/MainLayout';
import { UserContextProvider } from '../User/UserContext';

function MyApp({ Component, pageProps }) {
  return (
    <MainLayout>
      <UserContextProvider>
        <Component {...pageProps} />
      </UserContextProvider>
    </MainLayout>
  );
}

export default MyApp;
