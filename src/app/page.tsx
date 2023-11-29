'use client'
import { Button, Input, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { createPutObjectCommand } from './aws/s3Client';
import React, { useState } from 'react';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';


export default function Home() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleUpload = () => {
    // const formData = new FormData();
    setUploading(true);
    fileList.forEach((file) => {
      // formData.append('files[]', file as RcFile);
      createPutObjectCommand( file )
      .then((res) => alert(res?.toString()))
      .then(() => {
        setFileList([]);
        message.success('upload '+file.name+' successfully.');
      })
      .catch(() => {
        message.error('upload '+file.name+' failed.');
      })
      .finally(() => {
        
      });
    });
    setUploading(false);
  };

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div style={{ width: "300px" }}>
        <div style={{ marginBottom: "20px" }}>
          {" "}
          Text input: &nbsp; <Input style={{ width: "200px" }} />
        </div>
        <div style={{ marginBottom: "20px" }}>
          {" "}
          File input: &nbsp;
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>choose file</Button>
          </Upload>

        </div>
        <Button
          onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
        >
          {uploading ? 'Submiting' : 'Submit'}
          
        </Button>
      </div>
    </main>
  );
}

// function submit() {

//   createPutObjectCommand();
//   alert('test');
// }
