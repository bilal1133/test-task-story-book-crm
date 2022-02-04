import { ReactNode } from 'react';
import { Card } from 'reactstrap';

interface ExampleProps {
  className?: string;
  children?: ReactNode;
}

export const Example = ({
  className, children
}: ExampleProps): JSX.Element =>
  <>
    <div className={className}>
      <p>Put as many tags needed in here.</p>
      <p>Remember to import the tags at the top of the file. This is done by by clicking on the bulb icon</p>
      <Card>
        {children}
      </Card>
    </div>
  </>;

/**
 *
 * USAGE IN PAGE
 * <Example />
 * or
 * <Example>I will show up as the card body</Example>
 * or
 * <Example className="mt-5" />
 * or
 * <Example className="mt-5" />I will show up as the card body</Example?
 */
