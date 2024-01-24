'use client';
import { Container } from 'reactstrap';
import Breadcrumb from '../Common/Breadcrumb';
import PageCard from './PageCard';

const PagesContent = ({ params }) => {
  return (
    <>
      <Breadcrumb title={params.split('-').join(' ')} subNavigation={[{ name: 'Pages' }, { name: params }]} />
      <section className='blog-section section-b-space'>
        <Container>
          <PageCard params={params} />
        </Container>
      </section>
    </>
  );
};

export default PagesContent;
