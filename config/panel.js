import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import {Flex} from 'react-gm';
import {Text, Style} from './util';

class Panel extends React.Component {
    render() {
        const {title, children} = this.props;

        return (
            <div className="gm-padding-5 gm-margin-10" style={{border: '1px solid black', position: 'relative'}}>
                <div style={{
                    position: 'absolute',
                    top: '-8px',
                    background: 'white',
                    padding: '0 5px',
                    fontWeight: 'bolder'
                }}>
                    {title}
                </div>
                <div className="gm-padding-tb-5">
                    {children}
                </div>
            </div>
        );
    }
}

Panel.propTypes = {
    title: PropTypes.string.isRequired
};

class PanelTitle extends React.Component {
    handleText = (text) => {
        const {data, onUpdate} = this.props;
        onUpdate({
            ...data,
            text
        });
    };

    handleStyle = (style) => {
        const {data, onUpdate} = this.props;
        onUpdate({
            ...data,
            style
        });
    };

    render() {
        const {title, data} = this.props;

        return (
            <Panel title={title}>
                <Text block value={data.text} onChange={this.handleText}/>
                <Style size font gap style={data.style} onChange={this.handleStyle}/>
            </Panel>
        );
    }
}

PanelTitle.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
    onUpdate: PropTypes.func.isRequired
};

class PanelBlock extends React.Component {
    handleBlock = (index, type, value) => {
        const {data, onUpdate} = this.props;

        data.blocks[index][type] = value;

        onUpdate(data);
    };

    handleStyle = (style) => {
        const {data, onUpdate} = this.props;

        onUpdate({
            ...data,
            style
        });
    };

    render() {
        const {title, data} = this.props;

        return (
            <Panel title={title}>
                <Style size style={data.style} onChange={this.handleStyle}/>
                <div className="gm-padding-left-15 gm-margin-top-5" style={{
                    borderTop: '1px solid black'
                }}>
                    {_.map(data.blocks, (block, i) => (
                        <div
                            key={i}
                            className="gm-padding-tb-5 gm-margin-tb-5"
                            style={{borderTop: i === 0 ? '' : '1px dotted black'}}
                        >
                            <Text block value={block.text} onChange={this.handleBlock.bind(this, i, 'text')}/>
                            <Style font position style={block.style}
                                   onChange={this.handleBlock.bind(this, i, 'style')}/>
                        </div>
                    ))}
                </div>
            </Panel>
        );
    }
}

PanelBlock.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
    onUpdate: PropTypes.func.isRequired
};

class PanelColumns extends React.Component {
    handleChange = (index, type, value) => {
        const {data, onUpdate} = this.props;

        data.columns[index][type] = value;

        onUpdate(data);
    };

    render() {
        const {title, data} = this.props;

        return (
            <Panel title={title}>
                {_.map(data.columns, (col, i) => (
                    <div
                        key={i}
                        className="gm-padding-tb-5 gm-margin-tb-5"
                        style={{borderTop: i === 0 ? '' : '1px dotted black'}}
                    >
                        <Flex>
                            表头:
                            <Flex column flex>
                                <Text block value={col.head} onChange={this.handleChange.bind(this, i, 'head')}/>
                                <Style font style={col.headStyle}
                                       onChange={this.handleChange.bind(this, i, 'headStyle')}/>
                            </Flex>
                        </Flex>
                        <Flex>
                            内容:
                            <Flex column flex>
                                <Text block value={col.text} onChange={this.handleChange.bind(this, i, 'text')}/>
                                <Style font style={col.style} onChange={this.handleChange.bind(this, i, 'style')}/>
                            </Flex>
                        </Flex>
                    </div>
                ))}
            </Panel>
        );
    }
}

PanelColumns.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.any.isRequired,
    onUpdate: PropTypes.func.isRequired
};

export {
    PanelTitle,
    PanelBlock,
    PanelColumns
};
