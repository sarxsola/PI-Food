import React from 'react'
import { useState, useEffect } from 'react'
import { filter } from '../../actions/index'
import { connect } from 'react-redux'
import './Filter.css'

const Filter = ({filter}) => {

    const types = ['gluten free', 'ketogenic', 'vegetarian', 'dairy free'
    , 'lacto ovo vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'whole30'];


    // const [state, setState] = useState({
    //     diets: []
    // })

    // useEffect(() => {
    //     filter(state.diets)
    // }, [state.diets])


    // const handleChange = (e) => {
    //     if(e.target.checked){
    //         setState({
    //             ...state,
    //             diets: [...state.diets, e.target.value]
    //         })
    //     }
        
    //     if(!e.target.checked){
    //         setState({
    //             ...state,
    //             diets: state.diets.filter(diet => diet !== e.target.value)
    //         })
    //     }
    // }
    
    const [state,setState]=useState({
        diets: '',
        bool: false
    })

    useEffect(() => {
        if(state.bool){
            filter(state.diets)
        }
        if(!state.bool){
            filter('lucho')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state.bool,state.diets])

    const handleChange = (e) =>{
        setState({
            ...state,
            [e.target.name]: e.target.value,
            bool : e.target.checked
        })
    }

    return (
        <div className='filters'>
            <ul className='filter-list'>
                {
                    types.map((type, index) => 
                        <label key={index} className='filterContainer'>
                        <input type='checkbox' name='diets' onChange = {(e) => handleChange(e)} value={type} />
                        {type}
                    </label>)
                }
            </ul>
        </div>
    )
}

function mapDispatchToProps(dispatch){
    return{
        filter: (name) => dispatch(filter(name))
    }
}
export default connect(null, mapDispatchToProps )(Filter);
