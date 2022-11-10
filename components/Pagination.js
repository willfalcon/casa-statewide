import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';
import { media } from './theme';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { rgba } from 'polished';

const Pagination = ({ page, numPages }) => {
  const slug = 'stories';

  const prev = page > 1 ? page - 1 : false;
  const next = page === numPages ? false : page + 1;

  const twoBack = page > 2 ? page - 2 : false;
  const twoAhead = numPages - page > 1 ? page + 2 : false;
  const threeBack = page > 3 ? page - 3 : false;
  const threeAhead = numPages - page > 2 ? page + 3 : false;

  return (
    numPages > 1 && (
      <StyledPagination role="navigation" aria-label="Pagination Navigation">
        {prev && (
          <Link className="page-number prev" href={`/${slug}/${prev === 1 ? '' : prev}`} aria-label="Go to previous page">
            <AiOutlineLeft className="pagination-caret" />
          </Link>
        )}
        {threeBack && (
          <Link className="page-number" href={`/${slug}/${threeBack === 1 ? '' : threeBack}`} aria-label={`Go to page ${threeBack}`}>
            {threeBack}
          </Link>
        )}
        {twoBack && (
          <Link className="page-number" href={`/${slug}/${twoBack === 1 ? '' : twoBack}`} aria-label={`Go to page ${twoBack}`}>
            {twoBack}
          </Link>
        )}
        {prev && (
          <Link className="page-number" href={`/${slug}/${prev === 1 ? '' : prev}`} aria-label={`Go to page ${prev}`}>
            {prev}
          </Link>
        )}
        {numPages && <span className="page-number current">{page}</span>}
        {next && (
          <Link className="page-number" href={`/${slug}/${next === 1 ? '' : next}`} aria-label={`Go to page ${next}`}>
            {next}
          </Link>
        )}
        {twoAhead && (
          <Link className="page-number" href={`/${slug}/${twoAhead === 1 ? '' : twoAhead}`} aria-label={`Go to page ${twoAhead}`}>
            {twoAhead}
          </Link>
        )}
        {threeAhead && (
          <Link className="page-number" href={`/${slug}/${threeAhead === 1 ? '' : threeAhead}`} aria-label={`Go to page ${threeAhead}`}>
            {threeAhead}
          </Link>
        )}
        {next && (
          <Link className="page-number next" href={`/${slug}/${next === 1 ? '' : next}`} aria-label="Go to next page">
            <AiOutlineRight className="pagination-caret" />
          </Link>
        )}
      </StyledPagination>
    )
  );
};

const StyledPagination = styled.nav`
  margin: 0 auto 2rem;
  background: ${({ theme }) => theme.red};
  padding: 0.75rem;
  display: inline-flex;
  align-items: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  .page-number {
    /* color: ${({ theme }) => theme.offWhite}; */
    /* border-right: 1px solid ${({ theme }) => theme.offWhite}; */
    color: white;
    border-right: 1px solid white;
    padding: 0.25rem 0.5rem;
    display: block;
    line-height: 1;
    font-size: 1.8rem;
    text-decoration: none;
    &:last-child {
      border-right: 0;
    }
    &.current {
      /* color: ${({ theme }) => rgba(theme.offWhite, 0.5)}; */
      color: ${({ theme }) => rgba('white', 0.5)};
    }

    &.next,
    &.prev {
      height: 1.8rem;
      width: 2rem;
      position: relative;
      padding: 0;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 2px;
        width: 60%;
        /* background: ${({ theme }) => theme.offWhite}; */
        background: white;
        transform-origin: right;
        &:first-child {
          transform: translate(-50%, 0.75px) rotate(45deg);
        }
        &:last-child {
          transform: translate(-50%, -0.75px) rotate(-45deg);
        }
      }
    }

    &.prev {
      span {
        transform-origin: left;
        &:first-child {
          transform: translate(-50%, 0.75px) rotate(-45deg);
        }
        &:last-child {
          transform: translate(-50%, -0.75px) rotate(45deg);
        }
      }
    }
  }
`;

export default Pagination;
