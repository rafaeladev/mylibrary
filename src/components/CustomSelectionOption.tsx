// CustomSelectOption.tsx
import React from 'react';
import { components } from 'react-select';

const CustomSelectOption = (props: any) => {
    const { innerProps } = props;
    return (
        <div {...innerProps}>
            <components.Option {...props} />
        </div>
    );
};

export default CustomSelectOption;
