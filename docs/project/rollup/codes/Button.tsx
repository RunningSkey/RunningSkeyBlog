import React from "react";
import classnames from "classnames";
import './index.less';

const prefix = 'y';

export default (props: {
  children: React.ReactNode;
  type?: "default" | "primary";
}) => {
  const cName = `${prefix}-button`;
  return (
    <button
      className={classnames(cName, cName + '-' + (props.type || "default"))}
    >
      {props.children}
    </button>
  );
};