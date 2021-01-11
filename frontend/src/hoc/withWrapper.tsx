import React from 'react';
import { StyledComponent } from 'styled-components';
import { get } from 'lodash-es';

interface Option {
  wrapperClass: string | null;
}

const WithWrapper = (
  Wrapper: StyledComponent<'section', any>
    | StyledComponent<'div', any>,
  option?: Option,
) => <P extends {}>(
  BaseComponent: React.ComponentType<P>,
): React.FC<P> => (props) => {
    const wrapperClass = get(option, ['wrapperClass'], null) as string;

    return (
      <Wrapper
        className={wrapperClass}
      >
        <BaseComponent
          {...props}
        />
      </Wrapper>
    );
  };

export default WithWrapper;
