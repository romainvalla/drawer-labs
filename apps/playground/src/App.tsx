import React, { useState } from 'react';
import { Drawer } from '@drawer-labs/react';
import './App.css';

export default function App() {
  const [open, setOpen] = useState(false);

  return (
    <div className="app">
      <h1>Drawer Labs Playground</h1>
      <p>Interactive examples for E2E testing</p>

      <div className="examples">
        {/* Basic Drawer */}
        <section className="example">
          <h2>Basic Drawer</h2>
          <Drawer.Root>
            <Drawer.Trigger className="button">
              Open Basic Drawer
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content className="content">
                <Drawer.Handle />
                <Drawer.Title className="title">Basic Drawer</Drawer.Title>
                <Drawer.Description className="description">
                  This is a basic drawer component.
                </Drawer.Description>
                <div className="body">
                  <p>Drawer content goes here.</p>
                </div>
                <Drawer.Close className="button">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </section>

        {/* Controlled Drawer */}
        <section className="example">
          <h2>Controlled Drawer</h2>
          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger className="button">
              Open Controlled Drawer
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content className="content">
                <Drawer.Handle />
                <Drawer.Title className="title">Controlled Drawer</Drawer.Title>
                <Drawer.Description className="description">
                  State: {open ? 'Open' : 'Closed'}
                </Drawer.Description>
                <div className="body">
                  <p>This drawer's state is controlled externally.</p>
                  <button
                    type="button"
                    className="button"
                    onClick={() => setOpen(false)}
                  >
                    Close from Inside
                  </button>
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
          <button
            type="button"
            className="button"
            onClick={() => setOpen(true)}
          >
            Open from Outside
          </button>
        </section>

        {/* Modal Drawer */}
        <section className="example">
          <h2>Modal Drawer</h2>
          <Drawer.Root modal>
            <Drawer.Trigger className="button">
              Open Modal Drawer
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content
                className="content"
                aria-labelledby="modal-title"
                aria-describedby="modal-desc"
              >
                <Drawer.Handle />
                <Drawer.Title id="modal-title" className="title">
                  Modal Drawer
                </Drawer.Title>
                <Drawer.Description id="modal-desc" className="description">
                  This drawer locks body scroll and traps focus.
                </Drawer.Description>
                <div className="body">
                  <input
                    type="text"
                    placeholder="Try tabbing..."
                    className="input"
                  />
                  <input
                    type="text"
                    placeholder="Focus is trapped"
                    className="input"
                  />
                </div>
                <Drawer.Close className="button">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </section>

        {/* Non-Dismissible Drawer */}
        <section className="example">
          <h2>Non-Dismissible Drawer</h2>
          <Drawer.Root dismissible={false}>
            <Drawer.Trigger className="button">
              Open Non-Dismissible Drawer
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content className="content">
                <Drawer.Handle />
                <Drawer.Title className="title">Non-Dismissible</Drawer.Title>
                <Drawer.Description className="description">
                  This drawer cannot be dismissed by dragging or clicking overlay.
                </Drawer.Description>
                <div className="body">
                  <p>You must use the close button.</p>
                </div>
                <Drawer.Close className="button">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </section>

        {/* Different Directions */}
        <section className="example">
          <h2>Top Drawer</h2>
          <Drawer.Root direction="top">
            <Drawer.Trigger className="button">
              Open from Top
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content className="content top">
                <Drawer.Handle />
                <Drawer.Title className="title">Top Drawer</Drawer.Title>
                <Drawer.Description className="description">
                  This drawer opens from the top.
                </Drawer.Description>
                <Drawer.Close className="button">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </section>

        <section className="example">
          <h2>Left Drawer</h2>
          <Drawer.Root direction="left">
            <Drawer.Trigger className="button">
              Open from Left
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content className="content left">
                <Drawer.Handle />
                <Drawer.Title className="title">Left Drawer</Drawer.Title>
                <Drawer.Description className="description">
                  This drawer opens from the left.
                </Drawer.Description>
                <Drawer.Close className="button">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </section>

        <section className="example">
          <h2>Right Drawer</h2>
          <Drawer.Root direction="right">
            <Drawer.Trigger className="button">
              Open from Right
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="overlay" />
              <Drawer.Content className="content right">
                <Drawer.Handle />
                <Drawer.Title className="title">Right Drawer</Drawer.Title>
                <Drawer.Description className="description">
                  This drawer opens from the right.
                </Drawer.Description>
                <Drawer.Close className="button">Close</Drawer.Close>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </section>
      </div>
    </div>
  );
}
