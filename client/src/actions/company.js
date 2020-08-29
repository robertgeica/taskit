import axios from 'axios';
import { COMPANY_LOADED, COMPANY_ERROR, ADD_COMPANY, DELETE_COMPANY, UPDATE_COMPANY } from './types';

export const loadCompany = () => async (dispatch) => {
	const res = await axios.get('/company');
  
	try {
		dispatch({
			type: COMPANY_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: COMPANY_ERROR
		});
	}
};

export const handleAddCompany = (company) => async dispatch => {
  try {
    const res = await axios.post('/company', company);

    console.log('company to add', company);

    dispatch({
      type: ADD_COMPANY,
      payload: res.data
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
};

export const handleUpdateCompany = (id, newCompany) => async dispatch => {
  const res = await axios.get('/company/' + id);
  const data = res.data;

  try {
    await axios.post('/company/' + id, newCompany);
    dispatch({
      type: UPDATE_COMPANY,
      payload: [ data ]
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
};

export const handleDeleteCompany = id => async dispatch => {

  try {
    const res = await axios.delete('/company/' + id);

    dispatch({
      type: DELETE_COMPANY,
      payload: [res.data]
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
};

// add departament
export const handleAddDepartament = (id, newDepartament) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const data = res.data;

    const newData = res.data;
    newData.departaments = [ ...newData.departaments, newDepartament ];

    await axios.post('/company/' + id, newData);
    dispatch({
      type: ADD_COMPANY,
      payload: [ newData ]
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
}
// edit departament
export const handleUpdateDepartament = (id, departamentId, newDepartament) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const newData = res.data;
    const departaments = newData.departaments;

    let index = departaments.findIndex(obj => obj._id === departamentId);

    departaments[index] = newDepartament;

    await axios.post('/company/' + id, newData);

    dispatch({
      type: UPDATE_COMPANY,
      payload: [ newData ]
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
}

// delete departament
export const handleDeleteDepartament = (id, departamentId) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const newData = res.data;
    const departaments = newData.departaments;

    const newArray = departaments.filter((value, index, arr) => {
      return value._id !== departamentId
    })

    newData.departaments = newArray;
    await axios.post('/company/' + id, newData);
    console.log('deleted dep');
    dispatch({
      type: DELETE_COMPANY,
      payload: [newData]
    });
    dispatch(loadCompany());

  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
}

// add label
export const handleAddLabel = (id, newLabel) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const data = res.data;

    const newData = res.data;
    newData.labelStatus = [ ...newData.labelStatus, newLabel ];

    await axios.post('/company/' + id, newData);
    dispatch({
      type: ADD_COMPANY,
      payload: [ newData ]
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
}

// edit label
export const handleUpdateLabel = (id, labelId, newLabel) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const newData = res.data;
    const labelStatus = newData.labelStatus;

    let index = labelStatus.findIndex(obj => obj._id === labelId);

    labelStatus[index] = newLabel;

    await axios.post('/company/' + id, newData);

    dispatch({
      type: UPDATE_COMPANY,
      payload: [ newData ]
    });
    dispatch(loadCompany());
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
}

// delete label
export const handleDeleteLabel = (id, labelId) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const newData = res.data;
    const labelStatus = newData.labelStatus;

    const newArray = labelStatus.filter((value, index, arr) => {
      return value._id !== labelId
    })

    newData.labelStatus = newArray;
    await axios.post('/company/' + id, newData);
    dispatch({
      type: DELETE_COMPANY,
      payload: [newData]
    });
    dispatch(loadCompany());

  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    });
  }
}

// handle add employee to departament
export const handleAddEmployee = (id, depId, email) => async dispatch => {

  try {
    const res = await axios.get('/company/' + id);
    const data = res.data;

    const newData = res.data;
    const departaments = newData.departaments;
    let index = departaments.findIndex(obj => obj._id === depId);
    // console.log(departaments[index].departamentEmployees);

		const users = await axios.get('/company/' + id +'/find');
    console.log(users.data);
    let userIndex = users.data.findIndex(obj => obj.email === email);

    if(users.data[userIndex] >= 0) {
      departaments[index].departamentEmployees = [...departaments[index].departamentEmployees, users.data[userIndex]];
    };

    let newEmployee = users.data[userIndex]
    departaments[index].departamentEmployees.push(newEmployee);
    console.log(departaments);
    
    await axios.post('/company/' + id, newData);

    dispatch({
      type: ADD_COMPANY,
      payload: [ newData ]
    });
    dispatch(loadCompany());
    
  } catch (error) {
    dispatch({
      type: COMPANY_ERROR
    })
  }
}