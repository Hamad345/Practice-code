
export const Message = ({ styles, messageText }) => {
    return (
        <div 
            className={`${styles} text-[0.98rem] max-[456px]:text-[0.95rem] text-wrap border-2 border-slate-900/[13%] dark:border-slate-50/[13.5%] bg-slate-100 dark:bg-slate-900 max-w-max p-4 rounded-2xl`}
        >
            <p>{messageText}</p>
        </div>
    );
};
