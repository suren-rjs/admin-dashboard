import React from "react";
import TagsInput from "react-tagsinput";

import "react-tagsinput/react-tagsinput.css";

export class TagsInputComponent extends React.Component {
  constructor(props) {
    super();
    this.state = { tags: props.tags || [] };
    this.onTagsChange = props.onTagsChange;
    this.placeholder = props.placeholder;
    this.max = props.max;
  }

  handleChange = (tags) => {
    this.setState({ tags });
    if (this.onTagsChange) {
      this.onTagsChange(tags);
    }
  };

  render() {
    return (
      <TagsInput
        value={this.state.tags}
        onChange={this.handleChange}
        onlyUnique={true}
        inputProps={{
          placeholder: this.placeholder,
        }}
        maxTags={this.max}
      />
    );
  }
}
