import React, { Component } from 'react'
import { Upload, Icon, message, Button, DatePicker } from 'antd';
import moment from 'moment';
import firebase from './Firebase';
import FileViewer from 'react-file-viewer';

const Dragger = Upload.Dragger;
export default class UploadPage extends Component {
  state = {
    date:moment(),
    fileList: [],
    uploading: false,
    fileName: "",
    description: "",
    program: "other",
    course:"other",
  }

  handleUpload = () => {
    let self = this;
    this.setState({
      uploading: true,
    });
    let uploadTask = firebase.storage().ref(`Sheet/${this.state.fileName}`)
      .put(this.state.fileList[0])
    uploadTask.on('state_changed', (snapshot) => {
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done'); console.log(snapshot)
    }, (error) => {
      message.error('error')
      console.log(error)
    }, () => {
      message.success(`${this.state.fileName} upload successfully.`)
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        const db = firebase.firestore();
        db.collection(`sheets/`).add({
          fileName: self.state.fileName[0],
          description: self.state.description,
          url: downloadURL,
          program:self.state.program,
          course: self.state.course,
          date: self.state.date.unix(),
        });
        self.setState({
          fileList: '',
          fileName: '',
          description: '',
        })
      });

    });

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
  handleDateChange = (value) => {
    this.setState({date:value});
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

    return (
      <div>
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Dragger>
        <span>Date</span>
        <br />
        <DatePicker  defaultValue={this.state.date} onChange={this.handleDateChange} /> 
        <form>
          <label>
            File Name:
            <br />
            <input
              name="fileName"
              type="text"
              value={this.state.fileName}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            Program:
            <br />
            <input
              name="program"
              type="text"
              value={this.state.program}
              onChange={this.handleInputChange} />
          </label>
          <br />

          <label>
            Course Code:
            <br />
            <input
              name="course"
              type="text"
              value={this.state.course}
              onChange={this.handleInputChange} />
          </label>
         <br /> 
          <label>
            Description:
          <br />
            <textarea
              name="description"
              value={this.state.description}
              onChange={this.handleInputChange} />
          </label>
        </form>

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


