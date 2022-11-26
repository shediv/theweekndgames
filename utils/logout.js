import Router from 'next/router';

const useLogOut = () => {
  const logOut = () => {
    localStorage.removeItem("bugme");
    Router.push('/login');
  }
  return logOut;
}

export default useLogOut;