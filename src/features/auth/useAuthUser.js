import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from 'services/firebase';
import { signIn, signOut } from 'features/auth/authSlice';
import { reset } from 'features/root/rootSlice';
import { routes } from 'routes';

export default () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let currentUser = useSelector((state) => state.auth.user);
  if (!currentUser) {
    currentUser = JSON.parse(localStorage.getItem('authUser'));
  }

  useEffect(() => {
    const setUser = (user) => {
      if (user) {
        const newUser = {
          id: user.uid,
          email: user.email,
          refreshToken: user.refreshToken,
        };

        dispatch(signIn(newUser));
        localStorage.setItem('authUser', JSON.stringify(newUser));
      } else {
        dispatch(signOut());
        localStorage.removeItem('authUser');
        dispatch(reset());
        history.push(routes.login);
      }
    };

    const unsubscribe = auth().onAuthStateChanged(setUser);

    return () => unsubscribe();
  }, [dispatch]);

  return currentUser;
};
