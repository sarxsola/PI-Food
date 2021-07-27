import React from 'react'
import { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { sortByScore } from '../../actions';

const OrderByScore = ({sortByScore}) => {

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
        sortByScore(state);
    }, [state])

    return (
        <div className="order">
            <label htmlFor = 'orderScore'>Order by SCORE</label>
            <button type="switch" defaultValue="ASC" name ="orderScore" onClick={()=>toggleState()} >{state}</button>
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
        sortByScore: type => dispatch(sortByScore(type))
    }
}

export default connect(mapStatesToProps, mapDispatchToProps)(OrderByScore);
