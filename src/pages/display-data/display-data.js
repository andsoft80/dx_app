import React from 'react';
import 'devextreme/data/odata/store';
import be_conf from './../../be_config';
import axios from 'axios';
import Auth from './../../Authcontrol';
import ArrayStore from 'devextreme/data/array_store';
import DataSource from 'devextreme/data/data_source';
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  Editing,
  Lookup
} from 'devextreme-react/data-grid';

import locale from './../../locale'
import Lang from './../../Langcontrol'
const columns = ['EmployeeID', 'Active', 'CompanyID', 'Firstname', 'Surname', 'UserName', 'Notes', 'IdentificationData', 'Password', 'LastSignIn', 'Email', 'TimeZone', 'CompanyAdmin', 'Employed_By_Company_ID'];


class Data extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      selectedItem: null
    };


    this.dataSource = new DataSource({
      store: new ArrayStore({
        data: this.state.data,
        key: 'EmployeeID'
      })
    });
    this.selectionChanged = this.selectionChanged.bind(this);
    this.onRowUpdating = this.onRowUpdating.bind(this);
    this.onRowRemoving = this.onRowRemoving.bind(this);

    this.onRowInserting = this.onRowInserting.bind(this);
    // this.deleteRecords = this.deleteRecords.bind(this);
  }

  selectionChanged(data) {
    this.setState({
      selectedItem: data.row.key
    });
    // alert(JSON.stringify(data.row.key));
  }

  onRowUpdating(data) {
    var int = this;

    delete data.newData['EmployeeID'];
    var parcel = data.newData;
    parcel.EmployeeID = data.key;
    axios.post(be_conf.server + '/table/Employee/action/put/idName/EmployeeID', parcel, { headers: { "Authorization": 'Bearer ' + Auth.getToken() } })

      .then(function (response) {



        if (response.data.code === 'EREQUEST') {
          alert(JSON.stringify(response));
          int.componentDidMount();

        }
        else if (response.data === 'need_auth') {
          alert("Auth Error!");
          int.componentDidMount();
        }
        // else{
        //   int.componentDidMount();
        // }


      })
  }

  onRowRemoving(data) {
    var int = this;

    axios.post(be_conf.server + '/table/Employee/action/delete/idName/EmployeeID', { "EmployeeID": data.data.EmployeeID }, { headers: { "Authorization": 'Bearer ' + Auth.getToken() } })

      .then(function (response) {



        if (response.data.code === 'EREQUEST') {
          alert(JSON.stringify(response));
          int.componentDidMount();

        }
        else if (response.data === 'need_auth') {
          alert("Auth Error!");
          int.componentDidMount();
        }
        else {
          int.componentDidMount();
        }


      })
  }

  onRowInserting(data) {
    var int = this;

    // alert(JSON.stringify(data.data));
    delete data.data['EmployeeID'];
    axios.post(be_conf.server + '/table/Employee/action/post/idName/EmployeeID', data.data, { headers: { "Authorization": 'Bearer ' + Auth.getToken() } })

      .then(function (response) {



        if (response.data.code === 'EREQUEST') {
          alert(JSON.stringify(response));
          int.componentDidMount();

        }
        else if (response.data === 'need_auth') {
          alert("Auth Error!");
          int.componentDidMount();
        }
        else {
          int.componentDidMount();
        }


      })



  }

  componentDidMount() {
    var int = this;
    axios.post(be_conf.server + '/table/Employee/action/get/idName/EmployeeID', {}, { headers: { "Authorization": 'Bearer ' + Auth.getToken() } })
      .then(function (response) {
        // alert(JSON.stringify(response));
        var data = '';
        data = response.data;

        if (!data.recordset) {
          alert(JSON.stringify(data));
        }
        else {
          // int.dataSource.store.data = data.recordset;
          int.setState({
            data: data.recordset

          });
          // alert(JSON.stringify(data.recordset))

        }


      })


  }

  render() {
    return (
      <React.Fragment>
        <h2 className={'content-block'}>{locale.Employee[Lang.getLang()]}</h2>

        <DataGrid
          className={'dx-card wide-card'}
          dataSource={this.state.data}
          rtlEnabled={Lang.getLang() === 'ar'}

          // dataSource = {this.dataSource}
          showBorders={false}
          focusedRowEnabled={true}
          defaultFocusedRowIndex={0}
          columnAutoWidth={true}
          columnHidingEnabled={true}
          // defaultColumns={columns}
          keyExpr={'EmployeeID'}
          // onSelectionChanged = {this.selectionChanged}
          // onFocusedRowChanged = {this.selectionChanged}
          onRowUpdating={this.onRowUpdating}
          onRowRemoving={this.onRowRemoving}
          onRowInserting={this.onRowInserting}
          highlightChanges={true}
        >
          <Paging defaultPageSize={5} />
          <Pager showPageSizeSelector={true} showInfo={true} />
          <FilterRow visible={true} />
          <Editing
            mode="form"
            allowUpdating={true}
            allowAdding={true}
            allowDeleting={true}
            mode="popup"
            
          />

          <Column dataField={'EmployeeID'}  hidingPriority={8} caption={locale.EmployeeID[Lang.getLang()]}/>
          <Column
            dataField={'UserName'}
            // width={120}
            caption={locale.UserName[Lang.getLang()]}
            hidingPriority={15}
          />
          <Column
            dataField={'Firstname'}
            // width={120}
            caption={locale.FirstName[Lang.getLang()]}
            hidingPriority={14}
          />
          <Column
            dataField={'Surname'}
            // width={120}
            caption={locale.SurName[Lang.getLang()]}
            hidingPriority={13}
          />
          <Column
            dataField={'Active'}
            // width={90}
            caption={locale.Active[Lang.getLang()]}
            hidingPriority={12}
          />
          <Column
            dataField={'CompanyID'}
            // width={120}
            caption={locale.CompanyID[Lang.getLang()]}
            hidingPriority={11}
          />
          <Column
            dataField={'Notice'}
            // width={190}
            caption={locale.Notice[Lang.getLang()]}
            hidingPriority={10}
          />
          <Column
            dataField={'IdentificationData'}
            // width={120}
            caption={locale.IdentificationData[Lang.getLang()]}
            hidingPriority={9}
          />
          <Column
            dataField={'Email'}
            // width={190}
            caption={locale.Email[Lang.getLang()]}
            hidingPriority={8}
          />
          <Column
            dataField={'Password'}
            // width={190}
            caption={locale.Password[Lang.getLang()]}
            
            hidingPriority={7}
          />
          <Column
            dataField={'LastSignIn'}
            // width={190}
            caption={locale.LastSignIn[Lang.getLang()]}
            hidingPriority={6}
          />
          <Column
            dataField={'TimeZone'}
            // width={190}
            caption={locale.TimeZone[Lang.getLang()]}
            hidingPriority={5}
          />
          <Column
            dataField={'CompanyAdmin'}
            // width={190}
            caption={locale.CompanyAdmin[Lang.getLang()]}
            hidingPriority={4}
          />
          <Column
            dataField={'Employed_By_Company_ID'}
            // width={190}
            caption={locale.Employed_By_Company_ID[Lang.getLang()]}
            hidingPriority={3}
          />

        </DataGrid>
      </React.Fragment>
    );
  }
};
export default Data;