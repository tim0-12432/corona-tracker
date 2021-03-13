import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter/dist/cjs/styles/prism";
import RedoIcon from '@material-ui/icons/Redo';

import Loading from "./../Loading/Loading";

import mdFile from "./../../docs/manual.md";
import styles from "./Manual.module.css";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const gfm = require("remark-gfm");

export default class Vaccinations extends Component {
    state = {
        markdown: ""
    }

    async componentDidMount() {
        fetch(mdFile)
            .then((response) => response.text())
            .then(text => {
                this.setState({ markdown: text });
            });
    }

    renderers = {
        code: ({ language, value }) => {
            return <SyntaxHighlighter style={ materialDark } language={ language } children={ value } />
        }
    };


    render() {
        const { markdown } = this.state;

        if (markdown === "") {
            return (<div className={ styles.container }>
                <Loading />
            </div>)
        }
        return (
            <div className={ styles.container }>
                <Link to="/corona-tracker/" className={ styles.link }>Corona Tracker</Link>
                <a href="https://github.com/tim0-12432/corona-tracker" target="_blank" className={ styles.github }>Github <RedoIcon fontSize="small" /></a>
                <div className={ styles.markdown }>
                    <ReactMarkdown plugins={[gfm]} renderers={ this.renderers } children={ markdown } />
                </div>
            </div>
        );
    };
}