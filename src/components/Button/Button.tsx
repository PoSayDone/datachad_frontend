import React from 'react';

import style from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	color?: string;
	variant?: 'sm' | 'md';
	className?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant, color, ...props }, ref) => {
		return (
			<button
				className={`${style.button} ${style[variant || '']} ${
					style[color || '']
				} ${className}`}
				ref={ref}
				{...props}
			></button>
		);
	},
);

Button.displayName = 'Button';

export default Button;
