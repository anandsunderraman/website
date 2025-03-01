import { useState } from 'react'
import Scrollspy from 'react-scrollspy'
import ArrowRight from './icons/ArrowRight'

export default function TOC({
  className,
  cssBreakingPoint = 'xl',
  toc,
  contentSelector,
}) {
  if (!toc || !toc.length) return null
  const minLevel = toc.reduce((mLevel, item) => (!mLevel || item.lvl < mLevel) ? item.lvl : mLevel, 0)
  const tocItems = toc.filter(item => item.lvl <= minLevel + 2).map(item => ({ ...item, content: item.content.replace(/[\s]?\{\#[\w\d\-_]+\}$/, '') }))

  const [open, setOpen] = useState(false)

  return (
    <div className={`${className} ${tocItems.length ? '' : 'hidden'} ${cssBreakingPoint}:block z-20`} onClick={() => setOpen(!open)}>
      <div className={`flex cursor-pointer ${tocItems.length ? '' : 'hidden'} ${cssBreakingPoint}:cursor-auto`}>
        <h5 className={`${open && 'mb-4'} flex-1 text-primary-500 font-medium uppercase tracking-wide text-sm font-sans antialiased ${cssBreakingPoint}:mb-4 ${cssBreakingPoint}:text-xs ${cssBreakingPoint}:text-gray-500 ${cssBreakingPoint}:font-thin`}>
          On this page
        </h5>
        <div className={`text-underline text-center p4 ${cssBreakingPoint}:hidden`}>
          <ArrowRight className={`${ open ? '-rotate-90' : 'rotate-90' } transform transition duration-200 ease-in-out h-6 -mt-0.5 text-primary-500`} />
        </div>
      </div>
      <div className={`${!open && 'hidden'} ${cssBreakingPoint}:block`}>
        <Scrollspy
          items={tocItems.map(item => item.slug)}
          currentClassName="text-primary-600 font-bold"
          componentTag="div"
          rootEl={contentSelector}
        >
          {
            tocItems.map((item, index) => (
              <a
                className={`pl-${(item.lvl - minLevel) * 2} block mb-1 transition duration-100 ease-in-out text-gray-500 font-normal text-sm font-sans antialiased hover:text-gray-700 hover:font-medium`}
                href={`#${item.slug}`}
                key={index}
              >
                {item.content}
              </a>
            ))
          }
        </Scrollspy>
      </div>
    </div>
  )
}