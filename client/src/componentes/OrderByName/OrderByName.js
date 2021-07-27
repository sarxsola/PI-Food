import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { sortByName } from '../../actions';

const OrderByName = ({sortByName}) => {

    const [state, setState] = useState('ASC');

    const toggleState = () => {
        if(state === 'ASC'){
            setState('DESC')
        }

        if(state === 'DESC'){
            setState('ASC')
        }
    }

    useEffect(() => {
        sortByName(state);
    }, [state])

    return (
        <div className="order">
            <label htmlFor = 'orderName'>Order by NAME</label>
            <button type="switch" defaultValue="ASC" name ="orderName" onClick={()=>toggleState()} >{state}</button>
        </div>
    )
}

function mapStatesToProps(state) {
    return {
        recipes: state.recipes,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        sortByName: type => dispatch(sortByName(type))
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(OrderByName);