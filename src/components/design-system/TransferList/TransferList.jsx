import React from 'react';
import { DICTONARY } from 'const/Dictonary';
import Text from '../Text/Text';
import styles from './transferlist.module.css';
import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Pagination,
  Tooltip
} from '@mui/material';
import Loading from 'components/Loading/Loading';
import { TransformaPaginacionSinDecimales } from 'views/CargaMasiva/views/Ingresar/helpers/Transformaciones';
import { FixedSizeList } from 'react-window'; // Import FixedSizeList from react-window
import AutoSizer from 'react-virtualized-auto-sizer';

// const removeDuplicados = (options, accesor) => {
//   if (options && accesor) {
//     if (options.length === 0) {
//       return [];
//     }
//     return options.filter(item => item[accesor] !== '');
//   } else {
//     return [];
//   }
// };

const TransferListComponent = props => {
  const {
    accesor,
    accesor2,
    children,
    codigo,
    disabled,
    estado,
    isLoading,
    label,
    mostrarLabel,
    options,
    pageIndex,
    pageSize,
    setPagination,
    title,
    titleDestino,
    total,
    touched,
    value,
    setFieldValue,
    setFieldTouched,
    values,
    labelEditar,
    name,
    ...rest
  } = props;

  const getIcon = tipo => {
    const BASE = DICTONARY.ESTADO[tipo.toUpperCase()];
    return <BASE.ICONO className="mr-1 text-lg" />;
  };
  function not(a, b) {
    return a.filter(value => b.indexOf(value) === -1);
  }
  function intersection(a, b) {
    return a.filter(value => b.indexOf(value) !== -1);
  }
  function union(a, b) {
    return [...a, ...not(b, a)];
  }

  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState([]);
  const [right, setRight] = React.useState(values ? values : []);

  let labelView = mostrarLabel ? mostrarLabel : '';

  React.useMemo(() => {
    setLeft(options);
  }, [options]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = value => () => {
    setFieldTouched(name, true);
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const numberOfChecked = items => intersection(checked, items).length;

  const handleToggleAll = items => () => {
    setFieldTouched(name, true);
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
      setFieldValue(name, []);
    } else {
      setChecked(union(checked, items));
      setFieldValue(name, items);
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title, items) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'todos los items seleccionados'
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)} seleccionado`}
      />
      <Divider />
      <List
        sx={{
          width: 430,
          height: 300,
          bgcolor: 'background.paper',
          overflow: 'auto'
        }}
        dense
        component="div"
        role="list"
      >
        {
          isLoading ? (
            <div className="h-[300px]  flex flex-col justify-center items-center ">
              <Loading
                classWrapper="wrapperLoadingIndicadores"
                classChase="sk-chaseIndicadores"
              />
            </div>
          ) : (
            items.map((value, i) => {
              let label = value[labelView]
                ? value[labelView]
                : value[labelEditar][labelView];
              const labelId = `transfer-list-all-item-${value[codigo]}-label`;
              return (
                <ListItem
                  key={value[codigo]}
                  role="listitem"
                  button
                  onClick={handleToggle(value)}
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checked.indexOf(value) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{
                        'aria-labelledby': labelId
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText id={labelId} primary={` ${label} `} />
                </ListItem>
              );
            })
          )

          // <AutoSizer>
          //   {({ height, width }) => (
          //     <FixedSizeList
          //       height={300} // Set your desired height
          //       width={430} // Set your desired width
          //       itemCount={items.length}
          //       itemSize={40} // Set your item height (adjust as needed)
          //     >
          //       {({ index, style }) => {
          //         const value = items[index];
          //         let label = value[labelView];
          //         const labelId = `transfer-list-all-item-${value[codigo]}-label`;
          //         console.log('value :>> ', value);
          //         return (
          //           <div style={style} key={value}>
          //             <ListItem
          //               role="listitem"
          //               button
          //               onClick={() => handleToggle(value)}
          //             >
          //               <ListItemIcon>
          //                 <Checkbox
          //                   checked={checked.indexOf(value) !== -1}
          //                   tabIndex={-1}
          //                   disableRipple
          //                   inputProps={{
          //                     'aria-labelledby': labelId,
          //                   }}
          //                 />
          //               </ListItemIcon>
          //               <ListItemText id={labelId} primary={` ${label} `} />
          //             </ListItem>
          //           </div>
          //         );
          //       }}
          //     </FixedSizeList>
          //   )}
          // </AutoSizer>
        }
      </List>
    </Card>
  );

  const handleChangePage = (event, newPage) => {
    setPagination({
      pageIndex: newPage - 1,
      pageSize: pageSize
    });
  };

  React.useEffect(() => {
    setFieldValue(name, right);
  }, [name, right, setFieldValue]);

  return (
    <>
      <div
        className={`
        relative
      `}
      >
        <Text size="M" className="mb-4 mt-2">
          {label}
        </Text>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item>
            {customList(title, left)}
            <Pagination
              // count sea un valor int exacto
              count={TransformaPaginacionSinDecimales(total, pageSize)}
              defaultPage={pageIndex + 1}
              boundaryCount={3}
              onChange={handleChangePage}
              size="small"
              className="mt-3 p-0 flex justify-content-center md:max-w-[430px]"
            />
          </Grid>

          <Grid item>
            <Grid container direction="column" alignItems="center">
              <Tooltip title="Agregar empresas" placement="top">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedRight}
                  disabled={leftChecked.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
              </Tooltip>
              <Tooltip title="Quitar empresas" placement="bottom">
                <Button
                  sx={{ my: 0.5 }}
                  variant="outlined"
                  size="small"
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                  tooltip="Quitar empresas"
                >
                  &lt;
                </Button>
              </Tooltip>
            </Grid>
          </Grid>

          <Grid item>{customList(titleDestino, right)}</Grid>
        </Grid>

        {estado && touched && estado.mensaje && (
          <Text
            size="s"
            className="font-medium text-error-dark flex items-center py-1"
          >
            {getIcon(estado.tipo)} {estado.mensaje}
          </Text>
        )}
      </div>
    </>
  );
};

export default TransferListComponent;
