import React from 'react';
import { MaterialReactTable } from 'material-react-table';
import { MRT_Localization_ES } from 'material-react-table/locales/es';
import { ExpandMore } from '@mui/icons-material';
import './table.css';

const Table = props => {
  const {
    data,
    columns,
    actions,
    headTable,
    isLoading,
    enableRowActions = true,
    enableFilters
  } = props;
  const renderRowActions = enableRowActions
    ? { renderRowActions: actions }
    : null;

  // const [validationErrors, setValidationErrors] = useState({});

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    /* if (!Object.keys(validationErrors).length) {
      tableData[row.index] = values;
      setTableData([...tableData]);
      exitEditingMode(); //required to exit editing mode and close modal
    } */
  };

  const handleCancelRowEdits = () => {};

  return (
    <div id="tableComponent">
      <MaterialReactTable
        muiTablePaperProps={{
          elevation: 0
        }}
        muiTableHeadCellProps={{
          sx: {
            fontFamily: 'Poppins, sans-serif',
            fontSize: '13px'
          }
        }}
        icons={{
          ArrowDownwardIcon: props => <ExpandMore {...props} />
        }}
        localization={MRT_Localization_ES}
        state={{
          showSkeletons: isLoading,
          showProgressBars: false
        }}
        columns={columns}
        data={data}
        editingMode="modal"
        enableColumnFilterModes={false}
        enableColumnOrdering={false}
        enableDensityToggle={false}
        enableFullScreenToggle={false}
        enableHiding={false}
        onEditingRowSave={handleSaveRowEdits}
        onEditingRowCancel={handleCancelRowEdits}
        renderTopToolbarCustomActions={() => headTable}
        displayColumnDefOptions={{ 'mrt-row-actions': { size: 150 } }}
        enableStickyHeader
        enableStickyFooter
        enableFilters={enableFilters} // Oculta botón de filtros
        {...renderRowActions}
        {...props}
      />
    </div>
  );
};

export default Table;
