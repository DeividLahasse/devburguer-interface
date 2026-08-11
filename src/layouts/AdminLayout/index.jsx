// import { Navigate, Outlet } from 'react-router-dom';
// import { SideNavAdmin } from '../../components';
// import  { Container } from './styles'

// export function AdminLayout() {
//   const { admin: isAdmin } = JSON.parse(
    
//     localStorage.getItem('devburger:userData'),

    
//   );

//   return isAdmin ? (
//     <Container>
//       <SideNavAdmin />
//       <main>
//         <section>
//            <Outlet />
//         </section>
//       </main>
      
//     </Container>
//   ) : (
//     <Navigate to='/login' />
//   );
// }


import { Navigate, Outlet } from 'react-router-dom';
import { SideNavAdmin } from '../../components';
import { Container } from './styles';

export function AdminLayout() {
  const userDataRaw = localStorage.getItem('devburger:userData');
  const userData = userDataRaw ? JSON.parse(userDataRaw) : null;
  const isAdmin = userData?.admin;

  return isAdmin ? (
    <Container>
      <SideNavAdmin />
      <main>
        <section>
          <Outlet />
        </section>
      </main>
    </Container>
  ) : (
    <Navigate to='/login' />
  );
}