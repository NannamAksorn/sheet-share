import React, { Component } from 'react'
import { Upload, Icon, message, Button, DatePicker, Form, Select, Alert } from 'antd';
import moment from 'moment';
import { db, storage } from './Firebase';
import { connect } from 'react-redux'
const { Option } = Select;

const Dragger = Upload.Dragger;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
}

class UploadPage extends Component {
  state = {
    date: moment(),
    fileList: [],
    uploading: false,
    fileName: "Please Upload Your File First",
    description: "",
    program: "other",
    course: "other",
    programs: ['OTHER'],
    tag: [],
  }

  componentDidUpdate(prevProps) {
    if (this.props.fetchCourse && prevProps !== this.props) {
      let programs = [...new Set(this.props.fetchCourse.map(item => item.program))]
      this.setState({ programs: programs })
    }
  }

  handleUpload = () => {
    let self = this;
    if (this.props.fetchUser && this.props.fetchUser.uid) {
      console.log('ok')
    } else {
      message.error("Please Login")
      return
    }
    this.setState({
      uploading: true,
    });
    let uploadTask = storage.ref(`sheets/${this.state.fileName}`)
      .put(this.state.fileList[0])
    uploadTask.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      message.loading('Uploading ' + progress + "% done", 2.5)
    }, (error) => {
      message.error('error')
      console.log(error)
    }, () => {
      message.success(`${this.state.fileName} upload successfully.`)
      db.collection('users').doc(this.props.fetchUser.uid).get().then(doc => {
        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          db.collection(`sheets/`).add({
            fileName: self.state.fileName[0],
            description: self.state.description,
            url: downloadURL,
            program: self.state.program,
            course: self.state.course,
            tag: self.state.tag,
            date: self.state.date.unix(),
            username: doc.data().username,
            profile: self.props.fetchUser.photoURL
          });
          self.setState({
            fileList: '',
            fileName: '',
            description: '',
          })
        });

      });
    })

    this.setState({
      uploading: false,
    });

  }
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleProgramChange = (value) => {
    this.setState({
      program: value
    });
  }

  handleCourseChange = (value) => {
    this.setState({
      course: value
    });
  }

  handleTagChange = (value) => {
    this.setState({
      tag: value
    });
  }

  handleDateChange = (value) => {
    this.setState({ date: value });
  }
  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: (file) => {
        this.setState((state) => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        console.log(file)
        this.setState({
          fileList: [file],
          fileName: [file.name]
        });
        return false;
      },
      fileList,
    };
    let programOption = this.state.programs.map((item, key) =>
      <Option value={item} key={key} >{item}</Option>
    );

    let courseOption = this.props.fetchCourse.map((item, key) => {
      if (this.state.program === item.program) {
        return <Option value={item.code} key={key} >{item.code}</Option>
      }
    });

    let tagList = ['lecture', 'lab', 'manual', 'note', 'homework', 'classwork', 'project', 'quiz', 'midterm', 'final', 'score', 'cheatsheet']
    let tagOption = tagList.map((item, key) => {
      return <Option value={item} key={key} > {item} </Option>
    })

    return (
      <div>

        <br />

        <Form {...formItemLayout}>
          {/* upload */}
          <Form.Item wrapperCol={{ offset: 4, span: 16 }} >
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">Support for a single or bulk upload.</p>
            </Dragger>
          </Form.Item >
          {/* fileName */}
          <Form.Item label="File Name">
            <span className="ant-form-text">{this.state.fileName}</span>
          </Form.Item>
          {/* Date */}
          <Form.Item label="Date">
            <DatePicker defaultValue={this.state.date} onChange={this.handleDateChange} />
          </Form.Item>
          {/* Program */}
          <Form.Item label="Program">
            <Select
              showSearch
              placeholder="Select a Program"
              optionFilterProp="children"
              onChange={this.handleProgramChange}
              filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1}
            >
              {programOption}
            </Select>
          </Form.Item>
          {/* Course Code */}
          <Form.Item label="Course Code">
            <Select
              showSearch
              placeholder="Select a Course Code"
              optionFilterProp="children"
              onChange={this.handleCourseChange}
              filterOption={(input, option) => option.props.children.toUpperCase().indexOf(input.toUpperCase()) !== -1}
            >
              {courseOption}
            </Select>
          </Form.Item>
          {/* Tag  */}
          <Form.Item label="Tag">
            <Select
              showSearch
              placeholder="Select one or more tag"
              optionFilterProp="children"
              onChange={this.handleTagChange}
              mode="multiple"
            >
              {tagOption}
            </Select>
          </Form.Item>
          {/* description */}
          <Form.Item label="description">
            <textarea
              name="description"
              style={{ width: "100%" }}
              value={this.state.description}
              onChange={this.handleInputChange} />
          </Form.Item>
        </Form>

        <Button
          type="primary"
          onClick={this.handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { fetchCourse, fetchUser } = state
  return { fetchCourse, fetchUser }
}

export default connect(mapStateToProps)(UploadPage) 
