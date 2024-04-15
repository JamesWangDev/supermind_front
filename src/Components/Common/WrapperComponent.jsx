import { Col, Row } from 'reactstrap';

const WrapperComponent = ({ classes = {}, noRowCol = false, colProps = {}, customCol = false, ...props }) => {
  return (
    <section className={classes?.sectionClass ? classes?.sectionClass : ''} {...props}>
      <div className={`container-fluid-lg ${classes?.fluidClass ? classes?.fluidClass : ''}`}>
        {noRowCol ? (
          props.children
        ) : (
          <Row className={classes.row ? classes.row : ''}>
            {customCol ? (
              <>{props.children}</>
            ) : (
              <Col className={classes.col ? classes.col : ''} {...colProps}>
                {props.children}
              </Col>
            )}
          </Row>
        )}
      </div>
    </section>
  );
};

export default WrapperComponent;
