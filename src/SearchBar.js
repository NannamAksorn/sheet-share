import { AutoComplete } from 'antd';
import React, { Component } from 'react'
import { connect } from "react-redux"
import { setSearch } from "./actions"
class SearchBar extends Component {
    handleSearch = (value) =>{
        this.props.setSearch(value.split(" ")[0])
    }
    
    render() {
        let dataSource = this.props.fetchCourse;
        dataSource = dataSource.map((data) => {
            return `${data.code} ${data.name}`
        })
        return (
            <AutoComplete
                style={{ width: '100%' }}
                dataSource={dataSource}
                placeholder="Search"
                onSelect={this.handleSearch}
                filterOption={(inputValue, option) => {
                    if (inputValue.length > 1) {
                        return option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                }}
            />
        );
    }
}


const mapStateToProps = (state) => {
    const { fetchCourse } = state
    return { fetchCourse }
}

export default connect(mapStateToProps, { setSearch })(SearchBar)