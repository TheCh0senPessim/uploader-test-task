import React from 'react';
import {ProgressBar} from 'react-bootstrap';
import Message from './Message.jsx';
import Form from './Form.jsx';
import ErrorDialog from './ErrorDialog.jsx';
import {CHUNK_SIZE, ERROR_CHANCE} from '../const.js';
import percentage from '../utils.js';

class UploadComponent extends React.Component {
    chunckAmounts = 0;
    total = 0;
    constructor(props) {
        super(props);
        this.state = {
            file: '',
            fileName: 'Выберите файл',
            isLoading: false,
            isLoaded: false,
            loadingPercent: 0,
            uploadError: false,
        };
    }

    delay(ms) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let randomError = Math.random();
                if(randomError > ERROR_CHANCE) {
                    reject(new Error('upload-error'));
                }
                resolve();
            }, ms)
        })
    }

    // Рекурсия, проверяем кол-во чанков и вызываем задержку
    loop() {
        console.log(`loop start ${this.chunckAmounts}`);
        if (this.chunckAmounts === 0) {
            this.setState(() => ({isLoaded: true}));
            return;
        } 
        this.delay(300)
            .then(() => {
                let loadingPercent = percentage(this.total - this.chunckAmounts + 1, this.total);
                console.log(`one loop done - ${loadingPercent}`);
                console.log(`Чанков для отправки - ${this.chunckAmounts}`);
                this.setState(prevState => ({
                    loadingPercent: loadingPercent > 100 ? 100: loadingPercent,
                }), () => {
                    this.chunckAmounts = this.chunckAmounts - 1;
                    this.loop();
                });
            })
            .catch(e => {
                this.setState(() => ({
                    uploadError: true
                }))
                console.error(e.message);
            });
    }

    // Получаем файл из инпута и вычисляем кол-во чанков
    handleChange = evt => {
        this.setState({
            file: evt.target.files[0],
            fileName: evt.target.files[0].name,
        })
        this.chunckAmounts = Math.ceil(evt.target.files[0].size/CHUNK_SIZE);
        this.total = this.chunckAmounts;
    }

    // Запускаем загрузку, нажав на сабмит,меняем флаг загрузки в стейте,запускаем рекурсию 
    handleSubmit = evt => {
        evt.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file, this.state.file.name);
        this.setState(() => ({
            isLoading: true,
        }));
        this.loop();
    }

    handleCancel = () => {
        this.setState(() => ({
            file: '',
            fileName: 'Выберите файл',
            isLoading: false,
            isLoaded: false,
            loadingPercent: 0,
            uploadError: false,
        }));
    }

    handleReset = () => {
        this.setState(() => ({
            file: '',
            fileName: 'Выберите файл',
            isLoading: false,
            isLoaded: false,
            loadingPercent: 0,
            uploadError: false,
        }));
    }

    handleError = () => {
        this.loop();
        this.setState(() => ({
            uploadError: false,
        }));
    }

    render() {
        const {isLoaded, isLoading, uploadError, loadingPercent, fileName} = this.state;
        return(<>
            {isLoaded && <Message message={'Успешно'} onCloseClick={this.handleReset} />}

            {(uploadError && !isLoaded) && <ErrorDialog handleError={this.handleError} />}

            {isLoading ? 
                <>
                    <ProgressBar animated now={loadingPercent} label={`${loadingPercent}%`} />
                    <button className="btn btn-danger mt-3" onClick={this.handleCancel}>Отменить</button>
                </> : 

                <Form fileName={fileName} handleSubmit={this.handleSubmit} handleChange={this.handleChange} />
            }

        </>);
    }
}

export default UploadComponent;
