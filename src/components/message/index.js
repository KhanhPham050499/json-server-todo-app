import { message } from 'antd';

export const MessageFeedBack = {
    open: (msg) => message.open(msg),
    info: (msg) => message.info(msg),
    warn: (msg) => message.warn(msg),
    error: (msg) => message.error(msg),
    warning: (msg) => message.warning(msg),
    destroy: (msg) => message.destroy(msg),
    loading: (msg) => message.loading(msg),
    success: (msg) => message.success(msg),
    useMessage: (msg) => message.useMessage(msg),
}