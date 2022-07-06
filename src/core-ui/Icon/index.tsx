import * as SolidIcons from '@heroicons/react/solid'
import * as OutlineIcons from '@heroicons/react/outline'
import React from 'react'

type IconName = keyof typeof SolidIcons | keyof typeof OutlineIcons

interface Props {
  icon: IconName
  className?: string
  outline?: boolean
}

const CoreIcon = (props: Props): JSX.Element => {
  const { icon, className = 'w-4 h-4 text-gray-600', outline = false } = props

  const Icon = outline ? OutlineIcons[icon] : SolidIcons[icon]

  return <Icon className={className} />
};

export default CoreIcon