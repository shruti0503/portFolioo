import React from 'react'
import { BentoGrid } from './ui/BentoGrid'
import { BentoGridItem } from './ui/BentoGrid'
import { gridItems } from '@/data'

function Grid() {
  return (
    <section id='about' className='relative'>
        <BentoGrid className='w-full py-20'>
            {gridItems.map(({
              id, title,description, className, img, imgClassName, titleClassName, spareImg
            })=>(
                <BentoGridItem 
                id={id}
                key={id}
                title={title}
                description={description}
                className={className}
                img={img}
                titleClassName={titleClassName}
                spareImg={spareImg}
                />
            ))
            }
        </BentoGrid>

    </section>
  )
}

export default Grid