import { Accordion, AccordionBody, AccordionHeader, AccordionItem } from 'reactstrap';
import { blogSkeleton } from '../../../../../Data/CustomData';

const SKBlogSidebar = () => {
  const toggle = () => {};
  return (
    <Accordion className='left-accordion-box' open={'true'} toggle={toggle}>
      <AccordionItem className='skeleton-accordion'>
        <AccordionHeader targetId={'1'}>
          <span></span>
        </AccordionHeader>
        <AccordionBody accordionId={'1'}>
          <ul>
            {blogSkeleton.map((elem, i) => (
              <li className={`placeholder col-${elem?.xs}`} key={i}></li>
            ))}
          </ul>
        </AccordionBody>
      </AccordionItem>
    </Accordion>
  );
};

export default SKBlogSidebar;
