import { useModal } from 'react-modal-pop';

const ModalBody = ({ close, name }: { close: any, name: string }) => {
  return (
    <div className="modal position-static d-block">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close" onClick={() => close()} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <p>The name '{name}' text goes here.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => close()}>Close</button>
            <button type="button" className="btn btn-primary" onClick={() => close({ status: 'ok' })}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function App() {
  const { show, hide } = useModal();

  const onShow = async () => {
    setTimeout(() => {
      hide({ status: 'dismissed' });
    }, 5000);

    const result = await show(ModalBody, { name: 'John Doe' });
    console.log(result);
  }

  return (
    <div className="App d-flex vh-100 w-100 justify-content-center align-items-center">

      <button className='btn btn-primary mx-1' onClick={() => onShow()}>
        Launch Modal
      </button>
    </div>
  );
}

export default App;
