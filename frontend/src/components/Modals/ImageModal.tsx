import TransparentBackground from '../TransparentBackground';
import ModalContainer from './ModalContainer';
import { ReactNode } from 'react';

interface ImageModalProps {
  title: string;
  body: ReactNode;
  setShow: (show: boolean) => void;
  show: boolean;
  onCancel: () => void;
}

/**
 * A modal component used to display images.
 * @param props.title Modal headline displayed on top.
 * @param props.body The main element of the modal, usually an image.
 * @param props.setShow Callback that informs the parent when the modal should be hidden/displayed (e.g. when the user pressed the close button).
 * @param props.show Decides whether the modal should be shown.
 * @param props.onCancel Click callback for cancel/close button.
 */
export default function ImageModal({ title, body, setShow, show, onCancel }: ImageModalProps) {
  return (
    <>
      <TransparentBackground
        onClick={() => {
          setShow(false);
        }}
        show={show}
      />
      <ModalContainer show={show}>
        <div className="flex h-full min-h-[40vh] w-full min-w-[40vw] flex-col rounded-lg bg-neutral-100 p-6 dark:bg-neutral-100-dark">
          <div className="flex justify-between">
            <h2>{title}</h2>
            <button
              onClick={onCancel}
              className="rounded-lg border border-neutral-600 px-5 py-2.5 text-center text-sm font-medium hover:bg-neutral-600 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            >
              x
            </button>
          </div>
          <div className="flex justify-center">{body}</div>
        </div>
      </ModalContainer>
    </>
  );
}
