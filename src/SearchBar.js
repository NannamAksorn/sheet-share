import { AutoComplete } from 'antd';
import React, { Component } from 'react'
import { connect } from "react-redux"

class SearchBar extends Component {
    render() {
        let dataSource = this.props.fetchCourse;
        dataSource = dataSource.map((data) => {
            return `${data.code} ${data.name}`
        })
        console.log(dataSource)
        return (
            <AutoComplete
                style={{ width: '100%' }}
                dataSource={dataSource}
                placeholder="Search"
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

export default connect(mapStateToProps)(SearchBar)