import React, { ReactNode } from 'react';

import style from '../Button/Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: string;
	variant?: 'outlined' | 'fill';
	icon?: ReactNode;
	closable?: boolean;
}

const Chip = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ variant = 'fill', icon, closable, ...props }, ref) => {
		return (
			<button
				className={`${style.button} ${style.chip} ${style[closable ? 'closable' : '']} ${
					style[variant]
				} ${props.className}`}
				ref={ref}
				{...props}
			>
				{icon ? icon : ''}
				{props.children}
				{closable ? <span className='material-symbols-outlined'>close</span> : ''}
			</button>
		);
	},
);

Chip.displayName = 'Chip';

export default Chip;
