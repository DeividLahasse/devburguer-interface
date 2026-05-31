import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { ordersStatusOptions } from './ordersStatus';
import { Row } from './row';
import { Filter, FilterOptions } from './styled';

export function Orders() {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setfilteredOrders] = useState([]);
  const [activeStatus, setActiveStatus] = useState([0]);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadOrders() {
      const { data } = await api.get('/orders');
      setOrders(data);
      setfilteredOrders(data);
    }

    loadOrders();
  }, []);

  useEffect(() => {
    function createData(order) {
      return {
        name: order.user.name,
        orderId: order._id,
        date: order.createdAt,
        status: order.status,
        products: order.products,
      };
    }
    const newRows = filteredOrders.map((order) => createData(order));
    setRows(newRows);
  }, [filteredOrders]);

  function handleStatus(status) {
    if (status.id === 0) {
      setfilteredOrders(orders);
    } else {
      const newOrders = orders.filter((order) => order.status === status.value);
      setfilteredOrders(newOrders);
    }

    setActiveStatus(status.id);
  }

  useEffect(() => {
    if (activeStatus === 0) {
      setfilteredOrders(orders);
    } else {
      const statusIndex = ordersStatusOptions.findIndex(
        (item) => item.id === activeStatus,
      );
      if (statusIndex === -1) return;
      const newFilteredOrders = orders.filter(
        (order) => order.status === ordersStatusOptions[statusIndex].value,
      );
      setfilteredOrders(newFilteredOrders);
    }
  }, [orders, activeStatus]);

  return (
    <>
      <Filter>
        {ordersStatusOptions.map((status) => (
          <FilterOptions
            key={status.id}
            onClick={() => handleStatus(status)}
            $isActiveStatus={activeStatus === status.id}
          >
            {status.label}
          </FilterOptions>
        ))}
      </Filter>

      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Pedidos</TableCell>
              <TableCell>Clientes</TableCell>
              <TableCell>Data</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row
                key={row.orderId}
                row={row}
                orders={orders}
                setOrders={setOrders}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

// import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// import Box from '@mui/material/Box';
// import Collapse from '@mui/material/Collapse';
// import IconButton from '@mui/material/IconButton';
// import Paper from '@mui/material/Paper';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Typography from '@mui/material/Typography';
// import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { api } from '../../../services/api';
// import { Row } from './row';

// export function Orders() {
//   const [orders, setOrders] = useState([]);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     async function loadOrders() {
//       const { data } = await api.get('/orders');
//       setOrders(data);
//       console.log(data);
//     }

//     loadOrders();
//   }, []);

//   function createData(order) {
//     return {
//       name: order.user.name,
//       orderId: order.user._id,
//       date: order.createdAt,
//       status: order.status,
//       products: order.products,
//     };
//   }

//   useEffect(() => {
//     const newRows = orders.map((order) => createData(order));
//     setRows(newRows);
//   }, [orders]);

//   return (
//     <TableContainer component={Paper}>
//       <Table aria-label='collapsible table'>
//         <TableHead>
//           <TableRow>
//             <TableCell />
//             <TableCell>Pedidos</TableCell>
//             <TableCell>Clientes</TableCell>
//             <TableCell>Data</TableCell>
//             <TableCell>Status</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <Row key={row.orderId} row={row} />
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
